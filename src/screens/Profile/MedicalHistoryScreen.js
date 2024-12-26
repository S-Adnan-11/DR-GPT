import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, ScrollView, Switch } from 'react-native';
import { Avatar, Text, Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { fetchDocumentById, updateDocument } from '../../constants/firebaseFunctions'; // Firebase functions
import { auth } from '../../constants/FireBaseConfig'; // Firebase Auth configuration

const getRandomColor = () => {
  const colors = ['#FFB6C1', '#FFC0CB', '#DC143C', '#FF69B4', '#FFA07A', '#FFD700', '#ADFF2F', '#20B2AA', '#87CEFA'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const MedicalHistoryScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('');
  const [avatarColor, setAvatarColor] = useState(getRandomColor());
  const [profileInfo, setProfileInfo] = useState({
    allergies: '',
    avatar: 'https://via.placeholder.com/100',
    chronicDiseases: '',
    familyHistory: '',
    genotype: '',
    medications: '',
    surgicalHistory: '',
    medicalConditions: '',
    bloodType: '',
    vaccinations: '',
    diseases: '', // Added Diseases field
    prescription: '', // Added Prescription field
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const userDoc = await fetchDocumentById('users', userId); // Fetch user details
        const medicalHistoryDoc = await fetchDocumentById('medicalHistory', userId); // Fetch medical history data

        if (userDoc) {
          setUserName(userDoc.name || 'User'); // Fallback to 'User' if name is unavailable
        }
        if (medicalHistoryDoc) {
          setProfileInfo(medicalHistoryDoc); // Set fetched medical history data
        }
      } catch (error) {
        console.error('Error fetching user or medical history data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (key, value) => {
    setProfileInfo({ ...profileInfo, [key]: value });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need access to your photos to set a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileInfo({ ...profileInfo, avatar: result.assets[0].uri });
    }
  };

  const saveChanges = async () => {
    try {
      const userId = auth.currentUser.uid;
      await updateDocument('medicalHistory', userId, profileInfo); // Save changes to Firestore
      Alert.alert('Success', 'Medical history updated successfully!');
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating medical history data:', error);
      Alert.alert('Error', 'Failed to update medical history. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        {profileInfo.avatar ? (
          <Avatar.Image size={100} source={{ uri: profileInfo.avatar }} />
        ) : (
          <Avatar.Text
            size={100}
            label={userName.charAt(0)} // Display the first letter of the name
            style={{ backgroundColor: avatarColor }}
          />
        )}
        {isEditing && (
          <IconButton
            icon="camera"
            size={20}
            style={styles.cameraButton}
            onPress={pickImage}
          />
        )}
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Medical History Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical History</Text>

        {/* Editable Fields */}
        {[
          'allergies',
          'chronicDiseases',
          'familyHistory',
          'genotype',
          'medications',
          'surgicalHistory',
          'medicalConditions',
          'bloodType',
          'vaccinations',
          'diseases',
          'prescription',
        ].map((field) => (
          <View style={styles.fieldContainer} key={field}>
            <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')}</Text>
            <TextInput
              style={styles.input}
              editable={isEditing}
              value={profileInfo[field]}
              onChangeText={(text) => handleInputChange(field, text)}
            />
          </View>
        ))}
      </View>

      {/* Edit Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            if (isEditing) {
              saveChanges();
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#ddd',
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    width: '100%',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#2260FF',
    fontSize: 17,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    marginBottom: 10,
    backgroundColor: '#2260FF',
  },
});

export default MedicalHistoryScreen;
