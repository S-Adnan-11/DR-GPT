import React from 'react';
import { View, StyleSheet, ScrollView, Linking, Image, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Text, Card, IconButton, Button } from 'react-native-paper';
import CprAndChokingScreen from './FirstAid/CprAndChokingScreen';
import WoundBurnBleedingScreen from './FirstAid/WoundBurnBleedingScreen';
import PoisonAndAllergiesScreen from './FirstAid/PoisonAndAllergiesScreen';
import FracturesAndSprainsScreen from './FirstAid/FracturesAndSprainsScreen';

const FirstAidScreen = () => {
  const handleEmergencyCall = () => {
    Linking.openURL('tel:+112');
  };
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <ImageBackground
          source={require('../../assets/FirstAidIcons/first_aid.jpg')} // Add relevant image here
          style={styles.headerImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>First Aid</Text>
            <Text style={styles.subtitle}>Quick Help for Emergencies</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Emergency Call Button */}
      <Button
        mode="contained"
        icon="phone"
        onPress={handleEmergencyCall}
        style={styles.emergencyButton}
      >
        Call Emergency
      </Button>

      {/* Basic First Aid Principles */}
      <Card style={styles.card}>
        <Card.Title title="Basic First Aid" subtitle="General Principles"
          titleStyle={{ color: "#2260FF", fontSize: 20, fontWeight: 'bold' }} />
        <Card.Content>
          <Text style={styles.cardText}>
            These steps can help you manage an emergency:
            {'\n'}- Assess the scene for safety
            {'\n'}- Check the person's response
            {'\n'}- Call emergency services
            {'\n'}- Provide first aid (CPR, wounds, etc.)
          </Text>
        </Card.Content>
      </Card>

      {/* Emergency Scenarios */}
      <Text style={styles.sectionTitle}>Emergency Scenarios</Text>

      {/* CPR and Choking */}
      <Card style={styles.card}>
        <Card.Title title="CPR & Choking" titleStyle={{ color: "#2260FF", fontSize: 20, fontWeight: 'bold' }} />
        <Card.Content>
          <Image source={require('../../assets/FirstAidIcons/cpr-icon.png')} style={styles.image} />
          <Text style={styles.cardText}>
            Learn how to perform CPR and assist someone who is choking.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.learnMoreButton} labelStyle={styles.learnMoreButtonLabel} mode="outlined" onPress={() => navigation.navigate(CprAndChokingScreen)}>
            Learn More
          </Button>
        </Card.Actions>
      </Card>
             {/* Burns, Cuts, and Bleeding */}
       <Card style={styles.card}>
         <Card.Title title="Burns, Cuts, and Bleeding" titleStyle={{ color: "#2260FF", fontSize: 20, fontWeight: 'bold' }} />
         <Card.Content>
           { <Image source={require('../../assets/FirstAidIcons/burn-icon.png')} style={styles.image} /> }
           <Text style={styles.cardText}>
             How to handle wounds, burns, and bleeding:
             {'\n'}- Clean the wound
             {'\n'}- Apply pressure to stop bleeding
             {'\n'}- Cover with a sterile bandage
           </Text>
         </Card.Content>
         <Card.Actions>
           <Button style={styles.learnMoreButton} labelStyle={styles.learnMoreButtonLabel} mode="outlined" onPress={() => navigation.navigate(WoundBurnBleedingScreen)}>
             Learn More
           </Button>
         </Card.Actions>
       </Card>
       {/* Poisoning and Allergies */}
       <Card style={styles.card}>
         <Card.Title title="Poisoning and Allergies" titleStyle={{ color: "#2260FF", fontSize: 20, fontWeight: 'bold' }} />
         <Card.Content>
           { <Image source={require('../../assets/FirstAidIcons/poison-icon.png')} style={styles.image} /> }
           <Text style={styles.cardText}>
             What to do in case of poisoning or allergic reactions:
             {'\n'}- Call Poison Control
             {'\n'}- Administer epinephrine for allergies (if available)
           </Text>
         </Card.Content>
         <Card.Actions>
           <Button style={styles.learnMoreButton} labelStyle={styles.learnMoreButtonLabel} mode="outlined" onPress={() => navigation.navigate(PoisonAndAllergiesScreen)}>
             Learn More
           </Button>
         </Card.Actions>
       </Card>
       {/* Fractures and Sprains */}
       <Card style={styles.card}>
         <Card.Title title="Fractures and Sprains" titleStyle={{ color: "#2260FF", fontSize: 20, fontWeight: 'bold' }} />
         <Card.Content>
           { <Image source={require('../../assets/FirstAidIcons/fracture-icon.png')} style={styles.image} /> }
           <Text style={styles.cardText}>
             How to assist someone with fractures or sprains:
             {'\n'}- Immobilize the injured area
             {'\n'}- Apply ice and elevate the area
             {'\n'}- Seek professional medical help
           </Text>
         </Card.Content>
         <Card.Actions>
           <Button style={styles.learnMoreButton} labelStyle={styles.learnMoreButtonLabel} mode="outlined" onPress={() => navigation.navigate(FracturesAndSprainsScreen)}>
             Learn More
           </Button>
         </Card.Actions>
       </Card>
       {/* First Aid for Common Injuries */}
       <Text style={styles.sectionTitle}>Other Injuries</Text>
       <Card style={styles.card}>
         <Card.Title title="Head Injuries" titleStyle={{ color: "#2260FF", fontSize: 20, fontWeight: 'bold' }} />
         <Card.Content>
           <Text style={styles.cardText}>
             Immediate steps for head injuries:
             {'\n'}- Keep the person still
             {'\n'}- Apply ice to reduce swelling
             {'\n'}- Seek medical attention immediately
           </Text>
         </Card.Content>
       </Card>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end', // Align the text at the bottom of the image
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay to improve text visibility
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
  emergencyButton: {
    backgroundColor: '#FF0000',
    marginVertical: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2260FF',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#F1F1F1',
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  learnMoreButton: {
    borderWidth: 2.5,
    borderColor: '#2260FF',
    marginTop: 10,
    paddingVertical: 2,
  },
  learnMoreButtonLabel: {
    color: '#2260FF',
    fontSize: 15,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default FirstAidScreen;
