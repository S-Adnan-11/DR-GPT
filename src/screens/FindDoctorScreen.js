import React, { useState } from 'react';
import {FlatList, StyleSheet, View, TextInput, Alert, Modal, ScrollView, RefreshControl, } from 'react-native';
import { Card, Text, Avatar, Searchbar, Button, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
const initialDoctors = [
  {
    id: '1',
    name: 'Dr. John Smith',
    specialty: 'Cardiologist',
    phone: '123-456-7890',
    bio: 'Experienced in treating heart-related conditions with 15 years of practice.',
    location: 'New York, NY',
    rating: 4.5,
    reviews: 10,
    photo: 'https://via.placeholder.com/50',
    languages: ['English', 'Spanish'],
  },
  {
    id: '2',
    name: 'Dr. Emily Brown',
    specialty: 'Pediatrician',
    phone: '987-654-3210',
    bio: 'Passionate about child healthcare and wellness.',
    location: 'Los Angeles, CA',
    rating: 4.8,
    reviews: 20,
    photo: 'https://via.placeholder.com/50',
    languages: ['English'],
  },
  {
    id: '3',
    name: 'Dr. Michael Lee',
    specialty: 'Orthopedic Surgeon',
    phone: '456-789-0123',
    bio: 'Expert in sports injuries and joint replacement.',
    location: 'Chicago, IL',
    rating: 4.6,
    reviews: 15,
    photo: 'https://via.placeholder.com/50',
    languages: ['English', 'Mandarin'],
  },
];
const FindDoctorScreen = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [searchQuery, setSearchQuery] = useState('');
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [userRating, setUserRating] = useState('');
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '',
    specialty: '',
    phone: '',
    location: '',
    bio: '',
    email: '',
    medicalLicense: '',
    languages: '',
  });
  const updateRegistrationForm = (field, value) => {
    setRegistrationForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const submitDoctorRegistration = () => {
    const { fullName, specialty, phone, location, bio, email, medicalLicense, languages } =
      registrationForm;
    // Email validation using a regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    // Phone number validation (allows only digits and requires a minimum length of 10)
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert(
        'Invalid Phone Number',
        'Please enter a valid phone number with at least 10 digits.'
      );
      return;
    }
    // Medical license validation (must not be empty and at least 5 characters)
    if (!medicalLicense || medicalLicense.length < 5) {
      Alert.alert(
        'Invalid Medical License',
        'Please enter a valid medical license number (at least 5 characters).'
      );
      return;
    }
    // Check required fields
    if (!fullName || !specialty || !location || !bio) {
      Alert.alert('Incomplete Form', 'Please fill out all required fields.');
      return;
    }
    // Show confirmation message without adding the doctor to the list
    Alert.alert(
      'Request Submitted',
      'Thank you for your submission. Our team will review your details and contact you shortly.'
    );
    // Reset the registration form
    setRegistrationForm({
      fullName: '',
      specialty: '',
      phone: '',
      location: '',
      bio: '',
      email: '',
      medicalLicense: '',
      languages: '',
    });
    setRegisterModalVisible(false);
  };
  const handleDoctorRating = () => {
    if (!userRating || isNaN(userRating) || userRating < 1 || userRating > 5) {
      Alert.alert('Invalid Rating', 'Please enter a rating between 1 and 5.');
      return;
    }
    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) =>
        doctor.id === currentDoctor.id
          ? {
              ...doctor,
              rating:
                (doctor.rating * doctor.reviews + parseFloat(userRating)) /
                (doctor.reviews + 1),
              reviews: doctor.reviews + 1,
            }
          : doctor
      )
    );
    setUserRating('');
    setRatingModalVisible(false);
    Alert.alert('Thank You!', 'Your rating has been submitted.');
  };
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesQuery =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesQuery;
  });
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search by name, specialty, or location"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <Button
        mode="contained"
        onPress={() => setRegisterModalVisible(true)}
        style={styles.registerButton}
      >
        Register as a Doctor
      </Button>
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.name}
              subtitle={`${item.specialty} • ${item.location}`}
              left={() => (
                <Avatar.Image source={{ uri: item.photo }} size={50} />
              )}
            />
            <Card.Content>
              <Text>{item.bio}</Text>
              <Text>
                Rating: {item.rating.toFixed(1)} ({item.reviews} reviews)
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => {
                  setCurrentDoctor(item);
                  setRatingModalVisible(true);
                }}
              >
                Rate
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
      {/* Rating Modal */}
      <Modal
        visible={ratingModalVisible}
        animationType="slide"
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Rate {currentDoctor?.name}</Text>
          <TextInput
            placeholder="Enter rating (1-5)"
            style={styles.input}
            keyboardType="numeric"
            value={userRating}
            onChangeText={setUserRating}
          />
          <Button
            mode="contained"
            onPress={handleDoctorRating}
            style={styles.submitButton}
          >
            Submit Rating
          </Button>
        </View>
      </Modal>
      {/* Registration Modal */}
      <Modal
  visible={registerModalVisible}
  animationType="slide"
  onRequestClose={() => setRegisterModalVisible(false)}
>
  <ScrollView contentContainerStyle={styles.modalContainer}>
    <Text style={styles.modalTitle}>Doctor Registration</Text>
    {/* Full Name Field */}
    <Text style={styles.inputLabel}>Full Name*</Text>
    <TextInput
      placeholder="Enter your full name"
      style={styles.input}
      value={registrationForm.fullName}
      onChangeText={(text) => updateRegistrationForm('fullName', text)}
    />
    {/* Specialty Field */}
    <Text style={styles.inputLabel}>Medical Specialty*</Text>
    <TextInput
      placeholder="Enter your medical specialty"
      style={styles.input}
      value={registrationForm.specialty}
      onChangeText={(text) => updateRegistrationForm('specialty', text)}
    />
    {/* Phone Number Field */}
    <Text style={styles.inputLabel}>Phone Number*</Text>
    <TextInput
      placeholder="Enter your phone number"
      style={styles.input}
      keyboardType="phone-pad"
      value={registrationForm.phone}
      onChangeText={(text) => updateRegistrationForm('phone', text)}
    />
    {/* Email Address Field */}
    <Text style={styles.inputLabel}>Email Address*</Text>
    <TextInput
      placeholder="Enter your email address"
      style={styles.input}
      keyboardType="email-address"
      value={registrationForm.email}
      onChangeText={(text) => updateRegistrationForm('email', text)}
    />
    {/* Location Field */}
    <Text style={styles.inputLabel}>Location*</Text>
    <TextInput
      placeholder="Enter your location"
      style={styles.input}
      value={registrationForm.location}
      onChangeText={(text) => updateRegistrationForm('location', text)}
    />
    {/* Medical License Field */}
    <Text style={styles.inputLabel}>Medical License Number*</Text>
    <TextInput
      placeholder="Enter your medical license number"
      style={styles.input}
      value={registrationForm.medicalLicense}
      onChangeText={(text) => updateRegistrationForm('medicalLicense', text)}
    />
    {/* Languages Field */}
    <Text style={styles.inputLabel}>Languages (comma-separated)</Text>
    <TextInput
      placeholder="Enter languages you speak (e.g., English, Spanish)"
      style={styles.input}
      value={registrationForm.languages}
      onChangeText={(text) => updateRegistrationForm('languages', text)}
    />
    {/* Bio Field */}
    <Text style={styles.inputLabel}>Professional Bio*</Text>
    <TextInput
      placeholder="Write a short professional bio"
      style={[styles.input, styles.bioInput]}
      multiline
      numberOfLines={4}
      value={registrationForm.bio}
      onChangeText={(text) => updateRegistrationForm('bio', text)}
    />
    <Button
      mode="contained"
      onPress={submitDoctorRegistration}
      style={styles.submitButton}
    >
      Submit Registration
    </Button>
    <Button
      mode="outlined"
      onPress={() => setRegisterModalVisible(false)}
      style={styles.cancelButton}
    >
      Cancel
    </Button>
  </ScrollView>
</Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchBar: { marginBottom: 10 },
  registerButton: { marginBottom: 15 },
  card: { marginBottom: 10 },
  modalContainer: { padding: 20 },
  modalTitle: { fontSize: 20, marginBottom: 10 },
  input: { marginBottom: 15, borderWidth: 1, padding: 10 },
  submitButton: { marginTop: 10 },
});
export default FindDoctorScreen;