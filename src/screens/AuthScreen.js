import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.Register}>
      {/* Logo and App Description */}
      <View style={styles.Picture}>
        <Image
          style={styles.Logo}
          source={require("../../assets/logo.png")} // Update the path to your logo
        />
        <Text style={styles.AppName}>Dr.GPT</Text>
        <Text style={styles.AppText}>Your Personalized Health Assistant</Text>
      </View>

      {/* Welcoming Message */}
      <Text style={styles.DescriptionText}>
        Welcome to Dr.GPT! Access expert health tips, advice, and support to stay healthy and informed.
      </Text>

      {/* Buttons for Navigation */}
      <TouchableOpacity
        style={styles.ButtonLogin}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.ButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.ButtonSignUp}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={styles.ButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.ButtonSkip}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.ButtonSkipText}>Proceed Without an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Register: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  Picture: {
    alignItems: "center",
    marginTop: 150,
    marginBottom: 80,
    padding: 20,
  },
  Logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  AppName: {
    color: Colors.primaryColor,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  AppText: {
    color: Colors.secondaryColor,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  DescriptionText: {
    color: Colors.primaryColor,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  ButtonLogin: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 25,
    width: "80%",
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  ButtonSignUp: {
    backgroundColor: "#9BBFFF",
    borderRadius: 25,
    width: "80%",
    paddingVertical: 10,
    alignItems: "center",
  },
  ButtonSkip: {
    marginTop: 20,
  },
  ButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  ButtonSkipText: {
    color: Colors.primaryColor,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default AuthScreen;
