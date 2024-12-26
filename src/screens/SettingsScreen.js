import React from 'react';
import { View, StyleSheet, Switch, Text, Alert } from 'react-native';
import { List } from 'react-native-paper';
import { signOut } from 'firebase/auth'; // Ensure you import Firebase's auth functions
import { auth } from '../constants/FireBaseConfig'; // Import your Firebase auth instance

const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out method
      Alert.alert('Logged Out', 'You have successfully logged out.');
      navigation.navigate('LoginScreen'); // Redirect to the LoginScreen or any other screen
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
      console.error('Logout Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Settings
      </Text>

      <List.Section style={styles.section}>
        <List.Item
          title="Enable Notifications"
          right={() => <Switch value={true} onValueChange={() => {}} />}
        />
        <List.Item title="Change Password" onPress={() => {}} />
        <List.Item title="Privacy Settings" onPress={() => {}} />
      </List.Section>

      <List.Section style={styles.section}>
        <List.Item
          title="Logout"
          onPress={handleLogout} // Activate logout
          style={styles.logoutItem}
          titleStyle={styles.logoutText}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    color: '#2260FF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  logoutItem: {
    marginTop: 20,
    backgroundColor: '#FF5733',
    borderRadius: 10,
    paddingVertical: 10,
  },
  logoutText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
