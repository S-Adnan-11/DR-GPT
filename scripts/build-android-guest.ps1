param(
    [Parameter(Mandatory = $true)][string]$BuildRoot,
    [string]$JdkRoot = $env:JAVA_HOME,
    [string]$SdkRoot = $env:ANDROID_HOME,
    [string]$OutputDirectory
)
$ErrorActionPreference = 'Stop'
$sourceRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..')).TrimEnd('\')
$buildPath = [IO.Path]::GetFullPath($BuildRoot).TrimEnd('\')
if ($buildPath.Length -gt 60) { throw 'Choose a short external build directory (at most 60 characters) for native compiler paths.' }
if ($buildPath -eq $sourceRoot -or $buildPath.StartsWith($sourceRoot + '\', [StringComparison]::OrdinalIgnoreCase) -or $sourceRoot.StartsWith($buildPath + '\', [StringComparison]::OrdinalIgnoreCase)) {
    throw 'The build directory must be separate from the source checkout.'
}
$ancestor = $buildPath
while ($ancestor) {
    if (Test-Path -LiteralPath (Join-Path $ancestor '.git')) { throw 'The generated build must be outside every Git worktree.' }
    if ((Test-Path -LiteralPath $ancestor) -and ((Get-Item -LiteralPath $ancestor -Force).Attributes -band [IO.FileAttributes]::ReparsePoint)) { throw 'Use a build path without directory links.' }
    $ancestor = Split-Path -Parent $ancestor
}
if (-not $JdkRoot -or -not (Test-Path -LiteralPath (Join-Path $JdkRoot 'bin\java.exe'))) { throw 'Java 17 is required. Supply -JdkRoot or JAVA_HOME.' }
if (-not $SdkRoot -or -not (Test-Path -LiteralPath (Join-Path $SdkRoot 'build-tools\35.0.0'))) { throw 'Android SDK/build-tools 35 are required. Supply -SdkRoot or ANDROID_HOME.' }
if (-not $env:DRGPT_TEST_KEYSTORE -or -not $env:DRGPT_TEST_STORE_PASSWORD) { throw 'Provide DRGPT_TEST_KEYSTORE and DRGPT_TEST_STORE_PASSWORD through the protected build environment.' }
if (-not (Test-Path -LiteralPath $env:DRGPT_TEST_KEYSTORE)) { throw 'The test keystore does not exist.' }
$marker = Join-Path $buildPath '.drgpt-guest-build'
if (Test-Path -LiteralPath $buildPath) {
    if (-not (Test-Path -LiteralPath $marker) -and @(Get-ChildItem -LiteralPath $buildPath -Force).Count -gt 0) { throw 'Refusing to overwrite an unmanaged, nonempty build directory.' }
} else { New-Item -ItemType Directory -Path $buildPath | Out-Null }
Set-Content -LiteralPath $marker -Value 'Generated DR. GPT guest build directory.' -Encoding UTF8

$env:JAVA_HOME = $JdkRoot
$env:ANDROID_HOME = $SdkRoot
$env:ANDROID_SDK_ROOT = $SdkRoot
$env:PATH = (Join-Path $JdkRoot 'bin') + ';' + (Join-Path $SdkRoot 'platform-tools') + ';' + $env:PATH
$env:DRGPT_BUILD_PROFILE = 'guest'
$env:CI = '1'
$env:EXPO_NO_TELEMETRY = '1'
$env:EXPO_OFFLINE = '1'

Push-Location $sourceRoot
try {
    $files = @(git ls-files --cached --others --exclude-standard)
    if ($LASTEXITCODE -ne 0) { throw 'Cannot enumerate source inputs.' }
    $rootInputs = @('App.js','index.js','app.config.js','package.json','package-lock.json','babel.config.js','metro.config.js','react-native.config.js')
    $assetInputs = @('assets/icon.png','assets/logo.png','assets/adaptive-icon.png',
        'assets/LibraryPhotos/medical_library.jpg','assets/LibraryPhotos/sleep.jpg','assets/LibraryPhotos/nutrition2.jpeg','assets/LibraryPhotos/mental_health.jpg','assets/LibraryPhotos/fitness3.jpg',
        'assets/FirstAidIcons/first_aid.jpg','assets/FirstAidIcons/cpr-icon.png','assets/FirstAidIcons/burn-icon.png','assets/FirstAidIcons/poison-icon.png','assets/FirstAidIcons/fracture-icon.png')
    $files = @($files | Where-Object { $_ -in $rootInputs -or $_ -in $assetInputs -or $_ -match '^src/(guest|catalog)/' -or $_ -match '^tests/(guest.*|catalog)\.test\.cjs$' -or $_ -eq 'plugins/withOfflineGuest.js' -or $_ -eq 'scripts/build-android-guest.ps1' })
    foreach ($relative in $files) {
        if ($relative -in @('google-services.json', 'GoogleService-Info.plist')) { continue }
        $destination = Join-Path $buildPath $relative
        $directory = Split-Path -Parent $destination
        if (-not (Test-Path -LiteralPath $directory)) { New-Item -ItemType Directory -Path $directory -Force | Out-Null }
        Copy-Item -LiteralPath (Join-Path $sourceRoot $relative) -Destination $destination -Force
    }
} finally { Pop-Location }

# Generate the correctly named byte-identical illustration only in private staging.
$fractureOriginal = Join-Path $buildPath 'assets\FirstAidIcons\fracture-icon.png'
$fractureAlias = Join-Path $buildPath 'assets\FirstAidIcons\fracture-icon.webp'
$fractureBytes = [IO.File]::ReadAllBytes($fractureOriginal)
if ([Text.Encoding]::ASCII.GetString($fractureBytes,0,4) -ne 'RIFF' -or [Text.Encoding]::ASCII.GetString($fractureBytes,8,4) -ne 'WEBP') { throw 'The retained fracture illustration is not WebP.' }
Copy-Item -LiteralPath $fractureOriginal -Destination $fractureAlias -Force
if ((Get-FileHash -LiteralPath $fractureOriginal).Hash -ne (Get-FileHash -LiteralPath $fractureAlias).Hash) { throw 'Generated image alias differs from the original.' }

Push-Location $buildPath
try {
    $lockHash = (Get-FileHash -LiteralPath 'package-lock.json' -Algorithm SHA256).Hash
    $installedLock = Join-Path $buildPath '.guest-installed-lock'
    if (-not (Test-Path -LiteralPath 'node_modules\expo') -or -not (Test-Path -LiteralPath $installedLock) -or (Get-Content -LiteralPath $installedLock -Raw).Trim() -ne $lockHash) {
        & npm.cmd ci --ignore-scripts --no-audit --no-fund --offline
        if ($LASTEXITCODE -ne 0) { throw 'Locked dependency installation failed.' }
        Set-Content -LiteralPath $installedLock -Value $lockHash
    }
    $testInputs = @(Get-ChildItem -LiteralPath 'tests' -Filter '*.test.cjs' | ForEach-Object { $_.FullName })
    & node --test @testInputs
    if ($LASTEXITCODE -ne 0) { throw 'Guest boundary tests failed.' }
    & node node_modules/expo/bin/cli prebuild --platform android --no-install
    if ($LASTEXITCODE -ne 0) { throw 'Android prebuild failed.' }
    # Metro's asset task does not remove resources left by earlier asset names.
    $bundleResources = Join-Path $buildPath 'android\app\build\generated\res\createBundleReleaseJsAndAssets'
    if (Test-Path -LiteralPath $bundleResources) {
        $resolvedResources = (Resolve-Path -LiteralPath $bundleResources).Path
        if (-not $resolvedResources.StartsWith($buildPath + '\', [StringComparison]::OrdinalIgnoreCase) -or
            ((Get-Item -LiteralPath $bundleResources -Force).Attributes -band [IO.FileAttributes]::ReparsePoint)) {
            throw 'Unexpected generated-resource directory; refusing cleanup.'
        }
        Remove-Item -LiteralPath $resolvedResources -Recurse -Force
    }
    Push-Location 'android'
    try {
        & .\gradlew.bat :app:assembleRelease --no-daemon --max-workers=4
        if ($LASTEXITCODE -ne 0) { throw 'Android release APK build failed.' }
    } finally { Pop-Location }
    $apk = Join-Path $buildPath 'android\app\build\outputs\apk\release\app-release.apk'
    if (-not (Test-Path -LiteralPath $apk)) { throw 'The expected APK was not produced.' }
    if ($OutputDirectory) {
        New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
        $artifact = Join-Path $OutputDirectory 'dr-gpt-guest.apk'
        Copy-Item -LiteralPath $apk -Destination $artifact -Force
        Get-FileHash -LiteralPath $artifact -Algorithm SHA256
    } else { Get-FileHash -LiteralPath $apk -Algorithm SHA256 }
} finally { Pop-Location }
