const { withAndroidManifest, withAppBuildGradle, withGradleProperties } = require('expo/config-plugins');

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

function withOfflineGuest(config) {
  config = withAndroidManifest(config, (result) => {
    const manifest = result.modResults.manifest;
    manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
    manifest['uses-permission'] = (manifest['uses-permission'] || []).filter(
      (permission) => !blockedPermissions.includes(permission.$['android:name'])
    ).concat(blockedPermissions.map((name) => ({ $: { 'android:name': name, 'tools:node': 'remove' } })));
    const application = manifest.application[0];
    application.$['android:allowBackup'] = 'false';
    application.$['android:usesCleartextTraffic'] = 'false';
    application.$['android:fullBackupContent'] = 'false';
    return result;
  });
  config = withGradleProperties(config, (result) => {
    const values = { reactNativeArchitectures: 'armeabi-v7a,arm64-v8a', 'org.gradle.jvmargs': '-Xmx6144m -XX:MaxMetaspaceSize=1024m', 'org.gradle.parallel': 'false' };
    result.modResults = result.modResults.filter((item) => !Object.hasOwn(values, item.key));
    for (const [key, value] of Object.entries(values)) result.modResults.push({ type: 'property', key, value });
    return result;
  });
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
    buildTypes { release { signingConfig signingConfigs.guest } }
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
