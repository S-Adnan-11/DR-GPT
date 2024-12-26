import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';  // Using Card component for the box

const MedicalLibrartyScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.H}>Dummy Text</Text>
        <Text style={styles.cardText}>Medical Library of Articles and Videos etc</Text>
        <Text style={styles.cardText}>Tho the rest of the team are not intrested as they feel it's not feasible database wise...LOL!</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',  // Light background color for the screen
  },
  card: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
  },
  H:{
    fontSize: 25,
    color: '#2260FF',
    fontWeight: 'bold',
  }
});

export default MedicalLibrartyScreen;
