import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton, Text } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import EmergencyScreen from '../EmergencyScreen';

const WoundBurnBleedingScreen = () => {

     const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Wounds Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>How to Handle Wounds</Title>
          <Paragraph style={styles.paragraph}>
            Wounds are breaks in the skin or tissues. Here's how to handle them properly:
          </Paragraph>
          <View style={styles.instructions}>
            <Text style={styles.step}>1. Clean the wound: Rinse with clean water to remove dirt.</Text>
            <Text style={styles.step}>2. Apply pressure if the wound is bleeding to stop it.</Text>
            <Text style={styles.step}>3. Apply an antiseptic ointment to prevent infection.</Text>
            <Text style={styles.step}>4. Cover the wound with a sterile bandage or dressing.</Text>
            <Text style={styles.step}>5. If the wound is deep, seek professional medical help immediately.</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Burns Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>How to Handle Burns</Title>
          <Paragraph style={styles.paragraph}>
            Burns can cause severe damage to the skin. Follow these steps:
          </Paragraph>
          <View style={styles.instructions}>
            <Text style={styles.step}>1. For minor burns (1st-degree):</Text>
            <Text style={styles.step}>   - Hold the burn under cool running water for at least 10 minutes.</Text>
            <Text style={styles.step}>   - Apply aloe vera gel or burn cream to soothe the area.</Text>
            <Text style={styles.step}>   - Cover with a sterile non-stick bandage.</Text>
            <Text style={styles.step}>2. For more severe burns (2nd or 3rd-degree):</Text>
            <Text style={styles.step}>   - Do NOT remove clothing stuck to the skin.</Text>
            <Text style={styles.step}>   - Cover the burn with a clean cloth and call emergency services.</Text>
            <Text style={styles.step}>   - Do NOT apply ice or ointments to severe burns.</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Bleeding Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>How to Handle Bleeding</Title>
          <Paragraph style={styles.paragraph}>
            Bleeding can be life-threatening, so act fast. Here's what you should do:
          </Paragraph>
          <View style={styles.instructions}>
            <Text style={styles.step}>1. Apply direct pressure: Use a clean cloth or gauze to press on the wound.</Text>
            <Text style={styles.step}>2. Raise the injured area: If possible, raise the bleeding limb above the heart level.</Text>
            <Text style={styles.step}>3. If bleeding doesn't stop, apply more pressure and add a second layer of dressing.</Text>
            <Text style={styles.step}>4. If the wound is deep or bleeding heavily, apply a tourniquet (only if trained) and seek immediate help.</Text>
            <Text style={styles.step}>5. Never remove the dressing once it's applied; just add more if it becomes soaked.</Text>
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
    color: '#2260FF',  // Updated to your requested purple color
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
    backgroundColor: '#2260FF',  // Updated to your requested purple color
  },
});

export default WoundBurnBleedingScreen;
