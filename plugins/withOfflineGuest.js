const { withAndroidManifest, withAppBuildGradle, withGradleProperties, withSettingsGradle, withDangerousMod } = require('expo/config-plugins');
const { developmentModules } = require('../scripts/guest-profile.cjs');
const fs = require('node:fs/promises');
const path = require('node:path');

const blockedPermissions = [
  'INTERNET', 'ACCESS_NETWORK_STATE', 'ACCESS_WIFI_STATE', 'CHANGE_WIFI_STATE',
  'RECEIVE_BOOT_COMPLETED', 'POST_NOTIFICATIONS', 'VIBRATE', 'WAKE_LOCK',
  'FOREGROUND_SERVICE', 'FOREGROUND_SERVICE_DATA_SYNC', 'FOREGROUND_SERVICE_LOCATION',
  'FOREGROUND_SERVICE_MICROPHONE', 'READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE',
  'READ_MEDIA_IMAGES', 'READ_MEDIA_VIDEO', 'READ_MEDIA_AUDIO', 'READ_MEDIA_VISUAL_USER_SELECTED',
  'CAMERA', 'RECORD_AUDIO', 'ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION', 'ACCESS_BACKGROUND_LOCATION',
  'ACTIVITY_RECOGNITION', 'BLUETOOTH', 'BLUETOOTH_ADMIN', 'BLUETOOTH_CONNECT',
  'SCHEDULE_EXACT_ALARM', 'USE_EXACT_ALARM', 'USE_FULL_SCREEN_INTENT', 'SYSTEM_ALERT_WINDOW',
  'READ_PHONE_STATE', 'GET_ACCOUNTS', 'READ_CONTACTS', 'WRITE_CONTACTS', 'CALL_PHONE', 'SEND_SMS',
].map((name) => `android.permission.${name}`);

function withOfflineGuest(config, profile = {}) {
  const denied = config.android?.blockedPermissions || blockedPermissions;
  const development = profile.development === true;
  config = withAndroidManifest(config, (result) => {
    const manifest = result.modResults.manifest;
    manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
    manifest['uses-permission'] = (manifest['uses-permission'] || []).filter(
      (permission) => !denied.includes(permission.$['android:name'])
    ).concat(denied.map((name) => ({ $: { 'android:name': name, 'tools:node': 'remove' } })));
    const application = manifest.application[0];
    application.$['android:allowBackup'] = 'false';
    application.$['android:usesCleartextTraffic'] = 'false';
    application.$['android:fullBackupContent'] = 'false';
    if (development) application.$['android:networkSecurityConfig'] = '@xml/guest_development_network';
    return result;
  });
  config = withGradleProperties(config, (result) => {
    const values = { reactNativeArchitectures: (profile.architectures || ['armeabi-v7a','arm64-v8a']).join(','), 'org.gradle.jvmargs': '-Xmx6144m -XX:MaxMetaspaceSize=1024m', 'org.gradle.parallel': 'false' };
    result.modResults = result.modResults.filter((item) => !Object.hasOwn(values, item.key));
    for (const [key, value] of Object.entries(values)) result.modResults.push({ type: 'property', key, value });
    return result;
  });
  config = withSettingsGradle(config, (result) => {
    const excluded = [...require('../package.json').expo.autolinking.exclude, ...(development ? [] : developmentModules)];
    result.modResults.contents = result.modResults.contents.replace(/useExpoModules\([^)]*\)/g, `useExpoModules([exclude: ${JSON.stringify(excluded)}])`);
    return result;
  });
  if (development) config = withDangerousMod(config, ['android', async (result) => {
    const host = new URL(profile.runtime.metroOrigin).hostname;
    const directory = path.join(result.modRequest.platformProjectRoot, 'app/src/main/res/xml');
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, 'guest_development_network.xml'), `<?xml version="1.0" encoding="utf-8"?>\n<network-security-config><base-config cleartextTrafficPermitted="false"/><domain-config cleartextTrafficPermitted="true"><domain includeSubdomains="false">${host}</domain></domain-config></network-security-config>\n`);
    return result;
  }]);
  return withAppBuildGradle(config, (result) => {
    const start = '// BEGIN DRGPT GUEST SIGNING';
    const end = '// END DRGPT GUEST SIGNING';
    const block = `${start}
android {
    signingConfigs {
        guest {
            def guestStore = System.getenv("DRGPT_TEST_KEYSTORE")
            def guestPassword = System.getenv("DRGPT_TEST_STORE_PASSWORD")
            if (!guestStore || !guestPassword) {
                throw new GradleException("Test signing requires DRGPT_TEST_KEYSTORE and DRGPT_TEST_STORE_PASSWORD")
            }
            storeFile file(guestStore)
            storePassword guestPassword
            keyAlias "drgpt-test"
            keyPassword guestPassword
        }
    }
    buildTypes {
        release { signingConfig signingConfigs.guest }
        ${development ? 'debug { signingConfig signingConfigs.guest }' : ''}
    }
}
${end}`;
    result.modResults.contents = result.modResults.contents.replace(
      new RegExp(`${start}[\\s\\S]*?${end}\\n?`, 'g'), ''
    ).trimEnd() + '\n\n' + block + '\n';
    return result;
  });
}
module.exports = withOfflineGuest;
module.exports.blockedPermissions = blockedPermissions;
