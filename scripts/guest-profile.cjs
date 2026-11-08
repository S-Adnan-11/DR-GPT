const { metroAddress } = require('../src/guest/development');

const developmentModules = ['expo-dev-client', 'expo-dev-launcher', 'expo-dev-menu', 'expo-dev-menu-interface', 'expo-manifests', 'expo-updates-interface', 'expo-json-utils'];
function guestProfile(profile, target = 'handset', origin = 'http://127.0.0.1:8081') {
  if (!['guest', 'guest-dev'].includes(profile)) throw new Error('Set DRGPT_BUILD_PROFILE=guest or guest-dev. No other build profile is available.');
  if (!['handset', 'emulator'].includes(target)) throw new Error('The Android target must be handset or emulator.');
  const development = profile === 'guest-dev';
  if (development && !metroAddress(origin)) throw new Error('DRGPT_METRO_ORIGIN must identify one private HTTP Metro host and port.');
  return {
    development, target,
    applicationId: development ? 'com.drgpt.guest.dev' : target === 'emulator' ? 'com.drgpt.guest.emulator' : 'com.drgpt.guest',
    name: development ? 'DR. GPT Guest Dev' : target === 'emulator' ? 'DR. GPT Guest Emulator' : 'DR. GPT Guest Test',
    scheme: development ? 'drgpt-guest-dev' : target === 'emulator' ? 'drgpt-guest-emulator' : 'drgpt-guest-test',
    architectures: target === 'emulator' ? ['x86_64'] : development ? ['arm64-v8a'] : ['armeabi-v7a', 'arm64-v8a'],
    runtime: development ? { mode: 'fixture', schemaVersion: 1, network: 'metro', development: true, metroOrigin: origin } : { mode: 'fixture', schemaVersion: 1, network: 'deny' },
  };
}
module.exports = { guestProfile, developmentModules };
