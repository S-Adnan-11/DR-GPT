const { blockedPermissions } = require('./plugins/withOfflineGuest');

module.exports = () => {
  if (process.env.DRGPT_BUILD_PROFILE !== 'guest') {
    throw new Error('Set DRGPT_BUILD_PROFILE=guest. Only the private offline guest app can be built from this branch.');
  }
  return {
    name: 'DR. GPT Guest Test', slug: 'drgpt-guest-test', scheme: 'drgpt-guest-test',
    version: '1.0.0', orientation: 'portrait', userInterfaceStyle: 'light', newArchEnabled: true,
    icon: './assets/icon.png',
    splash: { image: './assets/logo.png', resizeMode: 'contain', backgroundColor: '#fbfaf7' },
    android: {
      package: 'com.drgpt.guest', versionCode: 1, permissions: [], blockedPermissions, allowBackup: false,
      adaptiveIcon: { foregroundImage: './assets/adaptive-icon.png', backgroundColor: '#fbfaf7' },
    },
    ios: { bundleIdentifier: 'com.drgpt.guest', supportsTablet: true },
    extra: { guest: { mode: 'fixture', schemaVersion: 1, network: 'deny' } },
    updates: { enabled: false }, plugins: ['./plugins/withOfflineGuest'],
  };
};
