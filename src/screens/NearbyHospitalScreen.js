import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Animated, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NearbyHospitalScreen = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [animation] = useState(new Animated.Value(0));
  const [region, setRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      if (currentLocation) {
        fetchNearbyHospitals(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
      }
    })();
  }, []);

  const fetchNearbyHospitals = async (latitude, longitude) => {
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="hospital"](around:1000000,${latitude},${longitude});way["amenity"="hospital"](around:5000,${latitude},${longitude}););out;`;

    try {
      const response = await fetch(overpassUrl);
      const data = await response.json();

      if (data && data.elements) {
        const validHospitals = data.elements.filter((hospital) => hospital.lat && hospital.lon);
        setHospitals(validHospitals);
        setFilteredHospitals(validHospitals); // Initialize filtered hospitals
      } else {
        setErrorMsg('No valid hospital data available');
      }
    } catch (error) {
      setErrorMsg('Failed to fetch hospitals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openGoogleMaps = (lat, lon) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
    Linking.openURL(url);
  };

  const handleMarkerPress = (hospital) => {
    setSelectedHospital(hospital);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeDetails = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setSelectedHospital(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredHospitals(hospitals);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = hospitals.filter(
        (hospital) =>
          hospital.tags?.name?.toLowerCase().includes(lowerCaseQuery) ||
          hospital.tags?.address?.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredHospitals(filtered);
    }
  };

  // Handle map press to close details panel if visible
  const handleMapPress = () => {
    if (selectedHospital) {
      closeDetails();
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={24} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for hospitals"
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
          />
        </View>
      </View>

      {errorMsg ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      ) : loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Fetching location...</Text>
        </View>
      ) : location ? (
        <>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            showsUserLocation
            userLocationAnnotationTitle="Your Location"
            showsMyLocationButton={false}
            customMapStyle={styles.mapStyle}
            onPress={handleMapPress} // Close details when map is clicked
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
              pinColor="blue"
            />
            {filteredHospitals.map((hospital, index) => {
              const latitude = hospital.lat || hospital.center?.[0];
              const longitude = hospital.lon || hospital.center?.[1];
              if (!latitude || !longitude) return null;

              return (
                <Marker
                  key={index}
                  coordinate={{ latitude, longitude }}
                  title={hospital.tags?.name || 'Hospital'}
                  onPress={() => handleMarkerPress(hospital)}
                  pinColor="#ff6347" // Tomato color for hospital marker
                />
              );
            })}
          </MapView>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            })}
          >
            <MaterialCommunityIcons name="map-marker-radius" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Hospital Details Slide-Up Panel */}
          {selectedHospital && (
            <Animated.View
              style={[
                styles.detailsPanel,
                { transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }] }
              ]}
            >
              <TouchableOpacity style={styles.closeButton} onPress={closeDetails}>
                <MaterialCommunityIcons name="close" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.hospitalName}>{selectedHospital.tags?.name || 'Unnamed Hospital'}</Text>
              <Text style={styles.hospitalAddress}>
                {selectedHospital.tags?.address || 'No address available'}
              </Text>
              {selectedHospital.tags?.phone && (
                <Text style={styles.hospitalPhone}>Phone: {selectedHospital.tags.phone || 'N/A'}</Text>
              )}
              {selectedHospital.tags?.website && (
                <TouchableOpacity
                  style={styles.websiteButton}
                  onPress={() => Linking.openURL(selectedHospital.tags.website)}
                >
                  <Text style={styles.websiteText}>Visit Website</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.directionsButton}
                onPress={() => openGoogleMaps(selectedHospital.lat, selectedHospital.lon)}
              >
                <Text style={styles.directionsText}>Get Directions</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </>
      ) : (
        <Text>Fetching location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  map: { flex: 1 },
  mapStyle: [],
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
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  resetButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  detailsPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 15 },
  closeButton: { position: 'absolute', top: 10, right: 10, zIndex: 10 },
  hospitalName: { fontWeight: 'bold', fontSize: 18, color: '#333' },
  hospitalAddress: { marginTop: 5, fontSize: 14, color: '#666' },
  hospitalPhone: { marginTop: 5, fontSize: 14, color: '#007BFF' },
  websiteButton: { marginTop: 10, backgroundColor: '#007BFF', padding: 10, borderRadius: 8 },
  websiteText: { color: '#fff', fontWeight: 'bold' },
  directionsButton: { marginTop: 10, backgroundColor: '#D2DDFA', padding: 10, borderRadius: 8 },
  directionsText: { color: '#212121', fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 18, color: '#555' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 18, color: '#FF0000', fontWeight: 'bold' },
});

export default NearbyHospitalScreen;
