import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton, Text } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import EmergencyScreen from '../EmergencyScreen';

const CprAndChokingScreen = () => {

  const navigation = useNavigation();


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* CPR Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>CPR (Cardiopulmonary Resuscitation)</Title>
          <Paragraph style={styles.paragraph}>
            CPR is a life-saving procedure performed when the heart stops beating. Here's how to do it:
          </Paragraph>
          <View style={styles.instructions}>
            <Text style={styles.step}>1. Ensure the person is unresponsive and not breathing.</Text>
            <Text style={styles.step}>2. Call emergency services immediately.</Text>
            <Text style={styles.step}>3. Place the person on their back on a firm surface.</Text>
            <Text style={styles.step}>4. Begin chest compressions:</Text>
            <Text style={styles.step}>   - Place the heel of one hand in the center of the chest.</Text>
            <Text style={styles.step}>   - Place the other hand on top and interlock fingers.</Text>
            <Text style={styles.step}>   - Push hard and fast, about 2 inches deep at a rate of 100-120 compressions per minute.</Text>
            <Text style={styles.step}>5. If trained, give 2 rescue breaths after every 30 compressions.</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Choking Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Choking Assistance</Title>
          <Paragraph style={styles.paragraph}>
            If someone is choking, you need to act quickly to clear their airway:
          </Paragraph>
          <View style={styles.instructions}>
            <Text style={styles.step}>1. Ask the person if they can cough or speak.</Text>
            <Text style={styles.step}>2. If they cannot, perform the Heimlich maneuver:</Text>
            <Text style={styles.step}>   - Stand behind the person and wrap your arms around their waist.</Text>
            <Text style={styles.step}>   - Place a fist just above their navel, and grab it with your other hand.</Text>
            <Text style={styles.step}>   - Perform quick, inward and upward thrusts.</Text>
            <Text style={styles.step}>3. If the object is not expelled, repeat until help arrives or the object is cleared.</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Button to go back or contact emergency */}
      <Button
        icon="phone"
        mode="contained"
        onPress={() => navigation.navigate(EmergencyScreen)}
        style={styles.button}
      >
        Call Emergency Services
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2260FF',
  },
  paragraph: {
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  instructions: {
    marginTop: 10,
    paddingLeft: 10,
  },
  step: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#2260FF',
  },
});

export default CprAndChokingScreen;
