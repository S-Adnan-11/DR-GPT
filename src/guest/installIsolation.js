import { Alert, Linking } from 'react-native';
import Constants from 'expo-constants';
const { installIsolation } = require('./policy');
const { developmentConfigurationError, installDevelopmentIsolation } = require('./development');

// Installed before application modules, including when configuration is invalid.
const configuration = Constants.expoConfig?.extra?.guest;
const development = typeof __DEV__ !== 'undefined' && __DEV__ === true;
const notify = (title, message) => Alert.alert(title, message);
if (!developmentConfigurationError(configuration, development)) {
  // Native entry can run before React Native creates its timers and transports.
  require('react-native/Libraries/Core/InitializeCore');
  installDevelopmentIsolation(globalThis, Linking, notify, configuration, development);
} else installIsolation(globalThis, Linking, notify);
