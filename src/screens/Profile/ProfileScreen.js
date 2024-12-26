
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import { deleteUser } from "firebase/auth";
import { auth } from "../../constants/FireBaseConfig";
import { fetchDocumentById } from "../../constants/firebaseFunctions";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { title: "Personal Information", screen: "UserInformationScreen" },
    { title: "Lifestyle Information", screen: "LifestyleScreen" },
    { title: "Medical History", screen: "MedicalHistoryScreen" },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userData = await fetchDocumentById("users", user.uid);
          setUserName(userData?.name || "User"); // Fallback to "User" if no name is available
          setUserPhoto(userData?.photoUrl || ""); // Fallback to no photo if none exists
        } else {
          Alert.alert("Error", "No user is currently logged in.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        Alert.alert("Error", "Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user) {
                await deleteUser(user);
                Alert.alert("Account Deleted", "Your account has been successfully deleted.");
                navigation.navigate("LoginScreen");
              } else {
                Alert.alert("Error", "No user is currently logged in.");
              }
            } catch (error) {
              console.error("Delete Account Error:", error);
              Alert.alert("Error", "Failed to delete account. Please try again.");
            }
          },
        },
      ]
    );
  };

  const renderSection = (title, items) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Text style={styles.itemText}>{item.title}</Text>
          <Icon name="chevron-forward-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileContainer}>
        {userPhoto ? (
          <Image source={{ uri: userPhoto }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {userName.charAt(0).toUpperCase() || "A"}
            </Text>
          </View>
        )}
        <Text style={styles.profileName}>
          {loading ? "Loading..." : userName}
        </Text>
      </View>

      {/* Sections */}
      {renderSection("User Data", menuItems)}

      <Button mode="contained" style={styles.deleteButton} onPress={handleDeleteAccount}>
        Delete Account
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  avatarPlaceholder: {
    backgroundColor: "#4A90E2",
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "#FFF",
    fontSize: 48,
    fontWeight: "600",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333333",
    marginTop: 10,
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A90E2",
    marginBottom: 5,
  },
  itemContainer: {
    backgroundColor: "#EAF2FF",
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  deleteButton: {
    height: 40,
    marginTop: 150,
    marginBottom: 10,
    backgroundColor: "#FF4C4C",
    width: "50%",
    alignSelf: "center",
  },
});

export default ProfileScreen;
