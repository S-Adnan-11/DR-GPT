# Offline Android guest build

This branch builds **DR. GPT Guest Test** (`com.drgpt.guest`), a private, fictional-data app. It has a separate identity from the original app and the earlier test app. No account, Firebase project, AI credential, map provider or development server is required to use the release APK.

## Build

Use Node/npm, Java 17, Android SDK platform 35, build-tools 35.0.0, NDK 26.1.10909125 and CMake 3.22.1. Keep the lockfile. Resolved dependencies and Expo/React Native versions are unchanged.

Supply `DRGPT_TEST_KEYSTORE` and `DRGPT_TEST_STORE_PASSWORD` through the protected process environment. The test keystore uses alias `drgpt-test`. Keep keys and passwords outside source, logs and Git.

```powershell
.\scripts\build-android-guest.ps1 -BuildRoot <short-external-directory> -JdkRoot <jdk-root> -SdkRoot <android-sdk-root> -OutputDirectory <private-output-directory>
```

The script stages only guest source and selected existing illustrations outside every Git worktree, installs locked packages with lifecycle scripts disabled, runs tests, generates Android and assembles a signed release APK with embedded JavaScript/assets. It first uses the npm cache in offline mode; a fresh build host must populate that cache from the locked packages. It rejects unmanaged nonempty build directories. An existing managed build can be reused.

One original PNG-named illustration contains WebP bytes. The script verifies the format and creates a byte-identical `.webp` alias only in private staging. No alias or generated binary is committed. Original image files are retained. Image publication rights remain a separate decision; this build is for private review.

`DRGPT_BUILD_PROFILE=guest` is required by configuration. Missing or other profiles fail closed. The app has no Internet, location, camera, microphone or notification permission. JavaScript network APIs and external link/call/message intents are blocked independently. Legacy service configuration and screens are excluded from build staging and the guest entry graph. This is an Android test path; iOS has not been validated.

## Guest behavior

Home, Learn, Find care and Saved remain available from the bottom navigation. The header provides First aid on every screen. Back returns through the current reading/directory journey; back at Home permits the system to leave the app.

Saved guides, fictional facilities and three checklist choices use one namespaced device store. Only stable IDs and a schema version are stored. Clearing saved items preserves the checklist; clearing the checklist preserves saves. Missing or unreadable storage leaves reading and search usable. Failed writes explicitly report session-only state. The app does not sync or collect a health profile.

First-aid pages contain clearly labeled review placeholders. The preparation guide contains draft general visit questions. There is no active emergency/contact action. Ask AI honestly reports that generated answers are unavailable and offers reading/search. Fictional listings and draft guidance are excluded by the public catalog selector.

## Checks

```powershell
npm run test:guest
```

Tests cover the catalog publication boundary, combined filters, branch IDs, absent optional fields, storage hydration/concurrency/recovery/deletion and route history. They do not establish clinical review or native-device behavior.

Install privately on an Android handset. With airplane mode enabled, cold-launch without Metro; save/reopen the guide and checklist, force-stop and relaunch, filter facilities and open both same-name branches. Check system back, empty results, First aid, AI fallback, larger text and image crops. Restore connectivity and confirm that fictional/offline behavior remains. Inspect the signed APK's actual identity, permissions and embedded inputs before transfer.
