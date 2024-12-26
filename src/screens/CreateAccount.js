import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Button, HelperText, IconButton } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../constants/FireBaseConfig'; // Firebase imports
import { useNavigation } from '@react-navigation/native'; // For navigation after sign-in

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Validate input fields
  const validateFields = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password || password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create account handler
  const handleCreateAccount = async () => {
    if (validateFields()) {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, username, password);
        navigation.navigate('UserDataScreen'); // Navigate to user data screen after successful account creation
      } catch (error) {
        console.error('Account creation error:', error);
        handleFirebaseError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle Firebase error messages
  const handleFirebaseError = (error) => {
    if (error.code === 'auth/email-already-in-use') {
      setErrors((prev) => ({ ...prev, username: 'This email is already registered.' }));
    } else if (error.code === 'auth/invalid-email') {
      setErrors((prev) => ({ ...prev, username: 'Please provide a valid email address.' }));
    } else if (error.code === 'auth/weak-password') {
      setErrors((prev) => ({ ...prev, password: 'Password should be stronger.' }));
    } else {
      setErrors((prev) => ({ ...prev, username: 'An unexpected error occurred. Please try again.' }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>

      {/* Username Input */}
      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setErrors((prev) => ({ ...prev, username: null }));
        }}
        mode="outlined"
        style={styles.input}
        error={!!errors.username}
      />
      {errors.username && <HelperText type="error">{errors.username}</HelperText>}

      {/* Password Input */}
      <TextInput
        label="Password"
        secureTextEntry={secureTextEntry}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors((prev) => ({ ...prev, password: null }));
        }}
        mode="outlined"
        style={styles.input}
        error={!!errors.password}
        right={<TextInput.Icon icon={secureTextEntry ? 'eye-off' : 'eye'} onPress={() => setSecureTextEntry(!secureTextEntry)} />}
      />
      {errors.password && <HelperText type="error">{errors.password}</HelperText>}

      {/* Confirm Password Input */}
      <TextInput
        label="Confirm Password"
        secureTextEntry={secureTextEntry}
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setErrors((prev) => ({ ...prev, confirmPassword: null }));
        }}
        mode="outlined"
        style={styles.input}
        error={!!errors.confirmPassword}
        right={<TextInput.Icon icon={secureTextEntry ? 'eye-off' : 'eye'} onPress={() => setSecureTextEntry(!secureTextEntry)} />}
      />
      {errors.confirmPassword && <HelperText type="error">{errors.confirmPassword}</HelperText>}

      {/* Sign-Up Button */}
      <Button
        mode="contained"
        onPress={handleCreateAccount}
        style={styles.signupButton}
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </Button>

      {/* Optional: Add any additional UI elements like Google Sign-In or error messages */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2260FF',
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
  },
  signupButton: {
    backgroundColor: '#2260FF',
    borderRadius: 25,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 25,
  },
});

export default CreateAccount;
