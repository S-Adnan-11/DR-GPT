import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import EmergencyScreen from '../EmergencyScreen';

const FracturesAndSprainsScreen = () => {

    const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Fractures Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>How to Handle Fractures</Title>
          <Paragraph style={styles.paragraph}>
            Fractures can occur from trauma to bones. It’s essential to stabilize the area and seek professional help:
          </Paragraph>
          <View style={styles.instructions}>
            <Text style={styles.step}>1. Confirm the fracture: Look for pain, swelling, deformity, or inability to move the limb.</Text>
            <Text style={styles.step}>2. Immobilize the injured area: Use a splint (or make one with a sturdy object) to prevent movement.</Text>
            <Text style={styles.step}>3. Apply ice to reduce swelling (do NOT place ice directly on the skin, wrap it in cloth or a towel).</Text>
            <Text style={styles.step}>4. Keep the person calm and still. Avoid moving the injured limb to prevent further damage.</Text>
            <Text style={styles.step}>5. Seek professional medical help immediately. Call emergency services for severe fractures (especially if there is bleeding or the bone is exposed).</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Sprains Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>How to Handle Sprains</Title>
          <Paragraph style={styles.paragraph}>
            Sprains involve the overstretching or tearing of ligaments. Here's how to manage a sprain:
          </Paragraph>
          <View style={styles.instructions}>
            <Text style={styles.step}>1. R.I.C.E method:</Text>
            <Text style={styles.step}>   - Rest: Avoid putting weight on the injured area.</Text>
            <Text style={styles.step}>   - Ice: Apply ice to reduce swelling (15–20 minutes every 1–2 hours).</Text>
            <Text style={styles.step}>   - Compression: Use an elastic bandage to help reduce swelling.</Text>
            <Text style={styles.step}>   - Elevation: Raise the injured area above the heart level to reduce swelling.</Text>
            <Text style={styles.step}>2. Avoid walking or putting pressure on the injured area until it’s healed.</Text>
            <Text style={styles.step}>3. Seek medical help if the swelling does not go down or if you cannot move the joint.</Text>
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

export default FracturesAndSprainsScreen;
