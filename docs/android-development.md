# Android development loop

Use **DR. GPT Guest Dev** (`com.drgpt.guest.dev`) for JavaScript/UI work. It is separate from the bundled offline phone app and the offline emulator app. It uses the same guest screens, local ID-only saves, draft content and fictional facilities. Calls, booking, external links, providers and analytics remain disabled.

The SDK 52 matched `expo-dev-client` is pinned to 5.0.13. Existing Expo, React Native and resolved dependency versions are retained. Development native modules are explicitly excluded from the offline profile.

## Linux computer and USB phone

Run these commands on the computer physically connected to the phone, outside any remote Windows desktop. The computer needs Node/npm, Git and Android platform-tools (`adb`). It does not need the full Android build toolchain to run Metro.

Use **Node 26.13.0 LTS** with its bundled **npm 11.20.0**. The repository's `.nvmrc` selects that version; guest tests and Metro source delivery were checked on Windows with it. Linux USB/phone checks remain pending. Install Git and ADB from the computer's package manager. This recipe uses [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to select Node after cloning.

```sh
git clone --branch work/android-guest https://github.com/S-Adnan-11/DR-GPT.git
cd DR-GPT
nvm install
nvm use
npm ci --ignore-scripts --no-audit --no-fund
adb devices
adb install -r /path/to/dr-gpt-guest-dev-arm64.apk
adb reverse tcp:8081 tcp:8081
npm run dev:guest
```

Enable USB debugging on the phone and accept its computer-authorization prompt. The device must appear as `device`, not `unauthorized` or `offline`. The ARM64 APK is supplied privately; keep it outside Git.

With Metro running, open a second terminal in the checkout:

```sh
adb shell am start -W -a android.intent.action.VIEW -d 'drgpt-guest-dev://expo-development-client/?url=http%3A%2F%2F127.0.0.1%3A8081' -p com.drgpt.guest.dev
```

The USB reverse rule makes the phone's port 8081 reach Metro on that computer. No public tunnel, router change or public ADB/Metro listener is used. Remote Desktop itself does not provide this phone connection.

For daily updates, run `git pull --ff-only` and `nvm use` in this checkout. Metro serves the updated checkout directly. Ordinary screen JavaScript, styles and served assets should refresh in the installed app without Gradle or reinstalling. Use `r` in the Metro terminal to reload. `adb shell input keyevent 82` opens the development menu when needed. Reconnect USB and rerun `adb reverse tcp:8081 tcp:8081` after reconnecting/restarting the phone.

`npm run dev:guest` selects the deliberate development profile, disables CLI telemetry and binds Metro's TCP listeners to loopback. It first warms SDK 52's public configuration-schema cache when needed so local manifest icons resolve, then starts Expo in offline mode. This metadata request sends no app records. If connectivity is absent, Metro still starts and reports any missing manifest-icon metadata. SDK 52's `--offline` already chooses a local host; it cannot be combined with `--localhost`. The guest JS transport guard permits the configured private Metro origin and bundle/asset/hot-reload paths. The native network-security configuration permits cleartext only for the configured host. Missing/invalid profiles, public Metro origins and a development configuration in a release JS runtime fail safely.

The mislabeled legacy WebP is copied into an ignored `.expo/guest-assets` cache, with format/byte checks and a source watcher. Metro reads application code from the active checkout; there is no application-source staging copy in the daily refresh loop.

## Emulator

Use an existing accelerated Android host, an API 35 x86_64 image and a phone AVD named `drgpt-api35`. Check acceleration and completed Android boot before installing an APK. The checked-in Windows helper uses the SDK roots in `ANDROID_HOME` / `ANDROID_AVD_HOME`:

```powershell
.\scripts\android-target.ps1 -Action Status
.\scripts\android-target.ps1 -Action Start
```

```sh
adb -s emulator-5580 shell getprop sys.boot_completed
adb -s emulator-5580 install -r /path/to/dr-gpt-guest-dev-x86_64.apk
adb -s emulator-5580 reverse tcp:8081 tcp:8081
adb -s emulator-5580 shell am start -W -a android.intent.action.VIEW -d 'drgpt-guest-dev://expo-development-client/?url=http%3A%2F%2F127.0.0.1%3A8081' -p com.drgpt.guest.dev
adb -s emulator-5580 emu kill
```

The start helper fails if acceleration is unavailable. It does not change Windows features, cloud CPU settings or restart the host. Those operations require their own maintenance scope. Keep emulator, ADB and Metro ports private.

## Build a new binary

Use the protected test-signing environment and toolchain described in [the offline build guide](android-guest.md). Use separate staging directories for development and offline profiles.

```powershell
.\scripts\build-android-guest.ps1 -BuildRoot <external-dev-directory> -Profile guest-dev -Target Handset -JdkRoot <jdk-root> -SdkRoot <sdk-root> -OutputDirectory <private-artifact-directory>
.\scripts\build-android-guest.ps1 -BuildRoot <external-dev-directory> -Profile guest-dev -Target Emulator -JdkRoot <jdk-root> -SdkRoot <sdk-root> -OutputDirectory <private-artifact-directory>
.\scripts\build-android-guest.ps1 -BuildRoot <external-offline-emulator-directory> -Profile guest -Target Emulator -JdkRoot <jdk-root> -SdkRoot <sdk-root> -OutputDirectory <private-artifact-directory>
```

The development phone APK contains ARM64; the development emulator APK contains x86_64. Their checksums are recorded separately. Both use the distinct development app ID. The offline emulator artifact uses `com.drgpt.guest.emulator`, includes x86_64 plus embedded JS/assets, and has no Internet permission. The default offline handset build remains `com.drgpt.guest` with ARM64/ARMv7.

New native dependencies, SDK upgrades, native config/plugins, permissions, application identity or the compiled Metro host allowlist require a new development binary. Entry/isolation code may need a full JS reload. Use the signed offline path at checkpoints for airplane-mode cold launch, bundled assets and behavior with Metro stopped. Development transport tests and browser rendering are separate from Android launch, Fast Refresh, system back and persistence evidence.
