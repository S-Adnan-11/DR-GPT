import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import doctors from '../services/doctors.json'; // Import your JSON data

const DoctorsScreen = () => {
  // Render a single doctor card
  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.specialty}>{item.specialty}</Text>

      {/* Phone number clickable */}
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
        <Text style={styles.contact}>Phone: {item.phone}</Text>
      </TouchableOpacity>

      {/* Email clickable */}
      <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.email}`)}>
        <Text style={styles.contact}>Email: {item.email}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={doctors} // Use the list of doctors
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        renderItem={renderDoctor} // Render each doctor
      />
    </SafeAreaView>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
    color: '#555',
  },
  contact: {
    fontSize: 14,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default DoctorsScreen;
