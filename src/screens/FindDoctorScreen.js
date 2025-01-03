import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { Linking } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import doctors from '../services/doctors.json'; // Import your JSON data

const DoctorsScreen = () => {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('specialty');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const specialties = useMemo(() => [...new Set(doctors.map((doctor) => doctor.specialty))], []);
  const locations = useMemo(() => [...new Set(doctors.map((doctor) => doctor.location))], []);

  // Filter doctors based on search and selected filter
  const filterDoctors = useCallback(() => {
    let filteredList = doctors;

    // Search by doctor name (case-insensitive)
    if (searchText.trim()) {
      filteredList = filteredList.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchText.trim().toLowerCase())
      );
    }

    // Filter by specialty if selected
    if (selectedSpecialty) {
      filteredList = filteredList.filter((doctor) => doctor.specialty === selectedSpecialty);
    }

    // Filter by location if selected
    if (selectedLocation) {
      filteredList = filteredList.filter((doctor) => doctor.location === selectedLocation);
    }

    setFilteredDoctors(filteredList);
  }, [searchText, selectedSpecialty, selectedLocation]);

  // Debounced search to prevent immediate re-filtering on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      filterDoctors();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText, selectedSpecialty, selectedLocation]);

  const renderDoctor = useCallback(({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.specialty}>{item.specialty}</Text>

      {/* Phone number clickable */}
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
        <Text style={styles.phone}>Phone: {item.phone}</Text>
      </TouchableOpacity>

      {/* Email clickable */}
      <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.email}`)}>
        <Text style={styles.contact}>Email: {item.email}</Text>
      </TouchableOpacity>

      <Button style={styles.button} onPress={() => Linking.openURL('https://cypruscentralhospital.com/en/make-an-appointment.html')}>
        <Text style={styles.text}>Book an Appointment</Text>
      </Button>
    </View>
  ), []);

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  // Handle filter selection
  const handleFilterChange = (itemValue) => {
    setSelectedFilter(itemValue);
    setSelectedSpecialty('');
    //setSelectedLocation('');
  };

  // Handle specialty/location change in filter menu
  const handleSpecialtyChange = (itemValue) => {
    setSelectedSpecialty(itemValue);
    setShowFilter(false);
  };

  // const handleLocationChange = (itemValue) => {
  //   setSelectedLocation(itemValue);
  //   setShowFilter(false);
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={24} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by doctor name"
            value={searchText}
            onChangeText={handleSearchChange}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Filter Button */}
      <View style={styles.filterContainer}>
        <Button style={styles.filterButton} onPress={() => setShowFilter(true)}>
          <Text style={styles.text}>Filter</Text>
        </Button>
      </View>

      {/* Filter Drawer */}
      {showFilter && (
        <View style={styles.filterDrawer}>
          <ScrollView contentContainerStyle={styles.filterContent}>
            <Text style={styles.filterTitle}>Select Filter</Text>
            <Picker selectedValue={selectedFilter} onValueChange={handleFilterChange}>
              <Picker.Item label="Specialty" value="specialty" />
              {/* <Picker.Item label="Location" value="location" /> */} 
            </Picker>

            {/* Show filter options based on the selected filter */}
            {selectedFilter === 'specialty' && (
              <Picker selectedValue={selectedSpecialty} onValueChange={handleSpecialtyChange}>
                <Picker.Item label="All Doctors" value="" />
                {specialties.map((specialty, index) => (
                  <Picker.Item key={index} label={specialty} value={specialty} />
                ))}
              </Picker>
            )}

            {/* {selectedFilter === 'location' && (
              <Picker selectedValue={selectedLocation} onValueChange={handleLocationChange}>
                <Picker.Item label="Select Location" value="" />
                {locations.map((location, index) => (
                  <Picker.Item key={index} label={location} value={location} />
                ))}
              </Picker>
            )} */}

            <Button style={styles.button} title="Close" onPress={() => setShowFilter(false)}>
              <Text style={styles.text}>Close</Text>
            </Button>
          </ScrollView>
        </View>
      )}

      {/* Doctors List */}
      <FlatList
        data={filteredDoctors} // Use the filtered list of doctors
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} // Fallback to index if id is missing
        renderItem={renderDoctor} // Render each doctor
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  filterButton: {
    color: '#FFF',
    borderWidth: 2.5,
    borderColor: '#2260FF',
    marginTop: 80,
    fontSize: 15,
    backgroundColor: '#2260FF',
  },
  filterContainer: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  filterDrawer: {
    position: 'absolute',
    top: 150,
    right: 10,
    width: '70%',
    height: '50%',
    backgroundColor: '#FFF',
    padding: 20,
    zIndex: 20,
    borderRadius: 20,
    borderColor: '#2260FF',
  },
  filterContent: {
    flexGrow: 1,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
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
  phone: {
    fontSize: 14,
    color: '#00ff0D',
    textDecorationLine: 'underline',
  },
  button: {
    color: '#FFF',
    borderWidth: 2.5,
    borderColor: '#2260FF',
    marginTop: 10,
    fontSize: 15,
    backgroundColor: '#2260FF',
  },
  text: {
    color: '#FFF',
  },
});

export default DoctorsScreen;



