param(
    [ValidateSet('Start','Stop','Status')][string]$Action = 'Status',
    [string]$SdkRoot = $env:ANDROID_HOME,
    [string]$AvdName = 'drgpt-api35'
)
$ErrorActionPreference = 'Stop'
if (-not $SdkRoot) { throw 'Set ANDROID_HOME to the existing Android SDK root.' }
$emulator = Join-Path $SdkRoot 'emulator\emulator.exe'
$adb = Join-Path $SdkRoot 'platform-tools\adb.exe'
if ($Action -eq 'Stop') { & $adb -s emulator-5580 emu kill; exit $LASTEXITCODE }
& $emulator -accel-check
$accelerationExit = $LASTEXITCODE
if ($Action -eq 'Status') { & $adb devices -l; exit $accelerationExit }
if ($accelerationExit -ne 0) { throw 'Android acceleration is unavailable. Complete the approved host maintenance before starting the reusable target.' }
$targetAvds = @(& $emulator -list-avds)
if ($targetAvds -notcontains $AvdName) { throw 'Create the intended AVD before starting it.' }
$logDirectory = Join-Path ([IO.Path]::GetTempPath()) 'drgpt-emulator'
New-Item -ItemType Directory -Path $logDirectory -Force | Out-Null
Start-Process -FilePath $emulator -ArgumentList @('-avd',$AvdName,'-no-window','-no-audio','-no-snapshot','-no-metrics','-gpu','software','-accel','on','-port','5580','-grpc','8554') -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logDirectory 'stdout.log') -RedirectStandardError (Join-Path $logDirectory 'stderr.log') | Out-Null
Write-Output 'Target starting as emulator-5580. Check adb shell getprop sys.boot_completed before installing an APK.'
