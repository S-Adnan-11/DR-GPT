import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { startupError } from './runtime';

export default function GuestApp() {
  return <SafeAreaView><Text>{startupError() || 'DR. GPT Guest Test · Offline guest build'}</Text></SafeAreaView>;
}
