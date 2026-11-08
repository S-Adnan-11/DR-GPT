import Constants from 'expo-constants';
const { configurationError } = require('./policy');
const { developmentConfigurationError } = require('./development');

const configuration = () => Constants.expoConfig?.extra?.guest;
export const developmentBuild = () => typeof __DEV__ !== 'undefined' && __DEV__ === true && configuration()?.development === true;
export const startupError = () => configuration()?.network === 'metro' ? developmentConfigurationError(configuration(), developmentBuild()) : configurationError(configuration());
export const assertGuestMode = () => { const error = startupError(); if (error) throw new Error(error); };
