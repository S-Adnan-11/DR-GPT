const { blockedPermissions } = require('./plugins/withOfflineGuest');
const { guestProfile } = require('./scripts/guest-profile.cjs');

module.exports = () => {
  const profile = guestProfile(process.env.DRGPT_BUILD_PROFILE, process.env.DRGPT_ANDROID_TARGET, process.env.DRGPT_METRO_ORIGIN);
  const permissions = profile.development ? blockedPermissions.filter((name) => !['android.permission.INTERNET', 'android.permission.ACCESS_NETWORK_STATE'].includes(name)) : blockedPermissions;
  return {
    name: profile.name, slug: profile.scheme, scheme: profile.scheme,
    version: '1.0.0', orientation: 'portrait', userInterfaceStyle: 'light', newArchEnabled: true,
    icon: './assets/icon.png',
    splash: { image: './assets/logo.png', resizeMode: 'contain', backgroundColor: '#fbfaf7' },
    android: {
      package: profile.applicationId, versionCode: 1, permissions: profile.development ? ['INTERNET', 'ACCESS_NETWORK_STATE'] : [], blockedPermissions: permissions, allowBackup: false,
      adaptiveIcon: { foregroundImage: './assets/adaptive-icon.png', backgroundColor: '#fbfaf7' },
    },
    ios: { bundleIdentifier: profile.applicationId, supportsTablet: true },
    extra: { guest: profile.runtime },
    updates: { enabled: false }, plugins: [
      ...(profile.development ? [['expo-dev-client', { launchMode: 'most-recent', addGeneratedScheme: false }]] : []),
      ['./plugins/withOfflineGuest', profile],
    ],
  };
};
