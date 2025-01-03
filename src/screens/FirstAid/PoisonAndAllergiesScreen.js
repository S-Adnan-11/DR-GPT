import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import EmergencyScreen from '../EmergencyScreen';

     
const PoisonAndAllergiesScreen = () => {

    const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Poisoning Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>How to Handle Poisoning</Title>
          <Paragraph style={styles.paragraph}>
            Poisoning occurs when a harmful substance is ingested, inhaled, or absorbed by the body. Here’s how to handle different types of poisoning:
          </Paragraph>
          <View style={styles.instructions}>
            <Text style={styles.step}>1. Ingested Poisoning (e.g., chemicals, medications):</Text>
            <Text style={styles.step}>   - Do NOT induce vomiting unless instructed by a medical professional.</Text>
            <Text style={styles.step}>   - If the person is conscious, try to identify the substance and call Poison Control .</Text>
            <Text style={styles.step}>   - If the person is unconscious, place them in the recovery position and call emergency services.</Text>
            <Text style={styles.step}>2. Inhaled Poisoning (e.g., gas, smoke):</Text>
            <Text style={styles.step}>   - Move the person to fresh air immediately.</Text>
            <Text style={styles.step}>   - If they’re unconscious, administer CPR if trained, and call emergency services.</Text>
            <Text style={styles.step}>3. Absorbed Poisoning (e.g., chemicals on the skin):</Text>
            <Text style={styles.step}>   - Remove contaminated clothing and rinse the skin with water for at least 15 minutes.</Text>
            <Text style={styles.step}>   - Call Poison Control or emergency services for further instructions.</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Allergies Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>How to Handle Allergies</Title>
          <Paragraph style={styles.paragraph}>
            Allergic reactions can range from mild to severe. Severe reactions, known as anaphylaxis, require immediate attention:
          </Paragraph>
          <View style={styles.instructions}>
            <Text style={styles.step}>1. Mild Allergic Reaction (e.g., rash, itching, swelling):</Text>
            <Text style={styles.step}>   - Give antihistamines as per instructions or doctor’s recommendation.</Text>
            <Text style={styles.step}>   - Keep the person calm and monitor their symptoms.</Text>
            <Text style={styles.step}>2. Severe Allergic Reaction (Anaphylaxis):</Text>
            <Text style={styles.step}>   - Administer epinephrine (if the person has an epi-pen). This is a life-saving medication.</Text>
            <Text style={styles.step}>   - Call emergency services immediately.</Text>
            <Text style={styles.step}>   - If the person is not breathing, begin CPR if trained.</Text>
            <Text style={styles.step}>   - Keep the person lying down and elevate their legs until help arrives.</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Emergency Button */}
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
    color: '#2260FF',  // Updated purple color
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
    backgroundColor: '#2260FF',  // Updated purple color
  },
});

export default PoisonAndAllergiesScreen;
