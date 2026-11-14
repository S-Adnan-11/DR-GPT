# Offline Android guest build

This branch builds **DR. GPT Guest Test** (`com.drgpt.guest`), a private, fictional-data app. It has a separate identity from the original app and the earlier test app. No account, Firebase project, AI credential, map provider or development server is required to use the release APK.

## Build

Use Node/npm, Java 17, Android SDK platform 35, build-tools 35.0.0, NDK 26.1.10909125 and CMake 3.22.1. Keep the lockfile. Existing resolved dependencies and Expo/React Native versions are retained; the separate development profile adds pinned SDK 52 tooling, excluded from the offline native module set.

Supply `DRGPT_TEST_KEYSTORE` and `DRGPT_TEST_STORE_PASSWORD` through the protected process environment. The test keystore uses alias `drgpt-test`. Keep keys and passwords outside source, logs and Git.

```powershell
.\scripts\build-android-guest.ps1 -BuildRoot <short-external-directory> -JdkRoot <jdk-root> -SdkRoot <android-sdk-root> -OutputDirectory <private-output-directory>
```

The script stages guest source, retained library conversion inputs and selected existing illustrations outside every Git worktree, installs locked packages with lifecycle scripts disabled, runs tests, generates Android and assembles a signed release APK with embedded JavaScript/assets. Installation prefers the npm cache and fetches any missing locked packages. It rejects unmanaged nonempty build directories. An existing managed build can be reused for the same profile. Use a separate directory for development binaries.

Two original PNG-named illustrations contain WebP and JPEG bytes. Metro verifies their formats and creates byte-identical aliases with the correct extensions in ignored private staging. No alias or generated binary is committed. Original image files are retained. Image publication rights remain a separate decision; this build is for private review.

`DRGPT_BUILD_PROFILE=guest` selects the offline configuration. Missing or unrecognized profiles fail closed; `guest-dev` is a deliberate separate [development profile](android-development.md). The offline app has no Internet, location, camera, microphone or notification permission. JavaScript network APIs and external link/call/message intents are blocked independently. Legacy service configuration and unrelated screens are excluded from build staging. The retained library screens are staged as conversion inputs and stay outside the guest entry graph. This is an Android test path; iOS has not been validated.

## Guest behavior

Home, Learn, Find care and Saved remain available from the bottom navigation. The header provides First aid on every screen. Back returns through the current reading/directory journey; back at Home permits the system to leave the app.

Saved guides, fictional facilities and three checklist choices use one namespaced device store. Only stable IDs and a schema version are stored. Clearing saved items preserves the checklist; clearing the checklist preserves saves. Missing or unreadable storage leaves reading and search usable. Failed writes explicitly report session-only state. The app does not sync or collect a health profile.

Facility cards and details keep each branch's stable ID, branch label, area and address together. Sample services are labeled fictional; missing services, contact, hours, map and directions are explained without external actions. A facility opened from Saved keeps Saved selected, and Back returns to that list. Filter choices remain when returning to Find care.

The saved-state key and version stay unchanged. Older guide/checklist saves without a facility collection load with an empty facility list. IDs removed from the catalog appear as unavailable saved facilities, with a removal action that preserves the other facilities, guides and checklist. No facility descriptions, contact details or personal notes enter storage. The location-candidate selector accepts only published records with finite in-range coordinates and dated source evidence; fixtures produce no pins. A map provider is not enabled in this build.

Learn opens with three guides: preparing for a healthcare visit, questions about a test, and what to confirm before leaving. Each has an editorial source check dated 13 November 2026, publisher attribution, page titles and selectable reference URLs available offline. This status records a check of the prompts against the cited pages; it does not claim clinical review. The covers use text and the existing UI without photo dependencies. Related guides open in the common reader.

The private legacy library retains all 24 original topics, IDs, text and image mappings as explicitly labeled drafts. Open it from Learn to search or browse its categories and topic entry points. Search matches titles, descriptions, categories and topic metadata in the selected collection; clearing the query keeps the category, while the empty-state reset restores that collection. Guides can be saved from a card or the reader. Opening a guide from Saved keeps Saved selected and Back returns to it. The preparation ID, storage key/schema and all checklist IDs stay unchanged. Existing legacy saves still resolve. Unavailable guide IDs have a removal action that preserves other guides, facilities and checklist choices.

Visit questions opens from Learn and the three sourced guide readers. Six stable menu IDs cover preparation, medicines lists, tests/results and what to confirm before leaving. Each answer contains exact selected guide excerpts, publisher/title/URL attribution and an action to read the source guide. Source and related-guide reading stays in the answer's Back history, even when a guide appeared earlier in the journey. Learn or Saved stays selected according to the originating reader. Missing, unpublished or invalid evidence shows recovery to Learn. Prompt selection and answers are not stored; existing guide/facility/checklist state is unchanged. This is an offline guide feature with no free-text input. Ask AI keeps its existing fallback.

The common reader handles headings, paragraphs, lists and full images without text overlays. Source links inherited from the original articles are displayed as unverified text with no external action. The converter retains the active articles' text, list markers, image order and repeated resource cards. Layout whitespace is normalized using JSX rules; resource button labels are retained as text. Generated draft records and image mappings stay under `.expo/guest-content`, outside committed source. Both Metro profiles generate the same records from the retained screens before bundling. A source comparison test checks every rendered text leaf and image occurrence independently against the original React trees.

First-aid pages retain their review placeholders and require qualified review. There is no active emergency/contact action. Ask AI reports that generated answers are unavailable and offers reading/search. Fictional listings and all draft guidance remain excluded by the public catalog selector. The selector accepts editorial source checks for Learn guides only; it cannot qualify First Aid. Rendering and conversion tests do not establish clinical accuracy or source review.

To export a public content bundle, run `node scripts/public-content.cjs <new-output-directory>`. It uses the publication selector and copies only images explicitly supplied in a cleared-image map through `writePublicContent`. The current three-guide export has no images, draft references, legacy records, first-aid placeholders or fictional facilities. An existing output directory is rejected to prevent stale private assets surviving an export. This exports content; the guest APK remains a private review build containing the retained legacy library.

## Checks

```powershell
npm run test:guest
```

Tests cover full topic coverage and conversion, metadata/category search, invalid/duplicate IDs and body blocks, the publication boundary, combined facility filters, branch identity/evidence, coordinate candidates, older saved-state compatibility, stale guide/facility IDs, storage hydration/concurrency/recovery/deletion and Back from Learn/Find care/Saved. They do not establish clinical review or native-device behavior.

Install privately on an Android handset. With airplane mode enabled, cold-launch without Metro; save/reopen the guide and checklist, force-stop and relaunch, filter facilities and open both same-name branches. Check system back, empty results, First aid, AI fallback, larger text and image crops. Restore connectivity and confirm that fictional/offline behavior remains. Inspect the signed APK's actual identity, permissions and embedded inputs before transfer.
