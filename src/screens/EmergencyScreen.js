import React from 'react';
import { View, StyleSheet, Alert, Linking } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';

const EmergencyScreen = ({ navigation }) => {
  const handleCall = () => {
    const emergencyNumber = '112'; // Replace with your region's emergency number
    Linking.openURL(`tel:${emergencyNumber}`).catch((err) =>
      Alert.alert('Error', 'Unable to make a call at this moment.')
    );
  };

  const handleSendMessage = () => {
    const emergencyContact = '112'; // Replace with emergency contact
    const message = 'I need urgent help. Please respond!';
    Linking.openURL(`sms:${emergencyContact}?body=${message}`).catch((err) =>
      Alert.alert('Error', 'Unable to send a message at this moment.')
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Emergency Assistance
      </Text>
      <Text variant="bodyLarge" style={styles.description}>
        In case of an emergency, you can call the emergency services or send a message to your emergency contact.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleCall}
          style={[styles.button, styles.callButton]}
          labelStyle={styles.buttonText}
          icon="phone"
        >
          Call Emergency
        </Button>

        <Button
          mode="contained"
          onPress={handleSendMessage}
          style={[styles.button, styles.messageButton]}
          labelStyle={styles.buttonText}
          icon="message-text"
        >
          Send Message
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#FF4D4D',
  },
  description: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 10,
    borderRadius: 30,
  },
  callButton: {
    backgroundColor: '#FF4D4D',
  },
  messageButton: {
    backgroundColor: '#2260FF',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EmergencyScreen;
