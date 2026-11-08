import Constants from 'expo-constants';
const { configurationError, assertConfiguration } = require('./policy');

const configuration = () => Constants.expoConfig?.extra?.guest;
export const startupError = () => configurationError(configuration());
export const assertGuestMode = () => assertConfiguration(configuration());
