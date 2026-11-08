import { Alert, Linking } from 'react-native';
const { installIsolation } = require('./policy');

// Installed before application modules, including when configuration is invalid.
installIsolation(globalThis, Linking, (title, message) => Alert.alert(title, message));
