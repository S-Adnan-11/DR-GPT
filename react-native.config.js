// Fixture builds do not use these alternative native providers or device APIs.
const excluded = [
  '@react-native-firebase/app', '@react-native-firebase/auth',
  '@react-native-google-signin/google-signin', 'react-native-google-signin',
  'react-native-maps', 'react-native-notifications', 'react-native-audio-recorder-player',
  'react-native-config', 'react-native-image-picker', 'react-native-localize', 'react-native-permissions',
];
module.exports = ['guest', 'guest-dev'].includes(process.env.DRGPT_BUILD_PROFILE)
  ? { dependencies: Object.fromEntries(excluded.map((name) => [name, { platforms: { android: null, ios: null } }])) }
  : {};
