import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, Menu, IconButton, Divider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPassword from './src/screens/ForgotPassword';
import CreateAccount from './src/screens/CreateAccount';
import UserDataScreen from './src/screens/UserDataScreen';
import HomeScreen from './src/screens/HomeScreen';
import FindDoctorScreen from './src/screens/FindDoctorScreen';
import NearbyHospitalScreen from './src/screens/NearbyHospitalScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import UserInformationScreen from './src/screens/Profile/UserInformation';
import MedicalHistoryScreen from './src/screens/Profile/MedicalHistoryScreen';
import LifestyleScreen from './src/screens/Profile/LifestyleScreen';
import AppointmentsScreen from './src/screens/AppointmentsScreen';
import ChatScreen from './src/screens/Chat/ChatScreen';
import HealthTipsScreen from './src/screens/HealthTipsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import MedicalLibraryScreen from './src/screens/MedicalLibraryScreen';
import SearchScreen from './src/screens/MedicalLibrary/SearchScreen';

import AddictionRecovery from './src/screens/MedicalLibrary/AddictionRecovery';
import AlternativeMedicine from './src/screens/MedicalLibrary/AlternativeMedicine';
import AlternativeTherapies from './src/screens/MedicalLibrary/AlternativeTherapies';
import BreathingHeartHealth from './src/screens/MedicalLibrary/BreathingHeartHealth';
import DiseaseManagement from './src/screens/MedicalLibrary/DiseaseManagement';
import Drugs from './src/screens/MedicalLibrary/Drugs';
import EnvironmentalHealth from './src/screens/MedicalLibrary/EnvironmentalHealth';
import Fitness from './src/screens/MedicalLibrary/Fitness';
import GeneralHealth from './src/screens/MedicalLibrary/GeneralHealth';
import GeneticsMedicine from './src/screens/MedicalLibrary/GeneticsMedicine';
import HealthNews from './src/screens/MedicalLibrary/HealthNews';
import HealthyAging from './src/screens/MedicalLibrary/HealthyAging';
import ImmuneInfectiousDiseases from './src/screens/MedicalLibrary/ImmuneInfectiousDiseases';
import MensHealth from './src/screens/MedicalLibrary/MensHealth';
import MentalHealth from './src/screens/MedicalLibrary/MentalHealth';
import Nutrition from './src/screens/MedicalLibrary/Nutrition';
import Parenting from './src/screens/MedicalLibrary/Parenting';
import SeniorHealth from './src/screens/MedicalLibrary/SeniorHealth';
import SexEmotionalHealth from './src/screens/MedicalLibrary/SexEmotionalHealth';
import SleepHealth from './src/screens/MedicalLibrary/SleepHealth';
import TeethOralHealth from './src/screens/MedicalLibrary/TeethOralHealth';
import TelemedicineTelehealth from './src/screens/MedicalLibrary/TelemedicineTelehealth';
import WomensHealth from './src/screens/MedicalLibrary/WomensHealth';
import WorkplaceHealth from './src/screens/MedicalLibrary/WorkplaceHealth';

import FirstAidScreen from './src/screens/FirstAidScreen';
import CprAndChokingScreen from './src/screens/FirstAid/CprAndChokingScreen';
import WoundBurnBleedingScreen from './src/screens/FirstAid/WoundBurnBleedingScreen';
import FracturesAndSprainsScreen from './src/screens/FirstAid/FracturesAndSprainsScreen';
import PoisonAndAllergiesScreen from './src/screens/FirstAid/PoisonAndAllergiesScreen';

import { auth, onAuthStateChanged } from './src/constants/FireBaseConfig'; // Firebase Authentication
import 'react-native-gesture-handler'; // Ensure gesture handler is imported
import 'react-native-reanimated'; // Ensure Reanimated is imported

// Ignore specific log messages
LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components in a future major release.',
]);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserData(firebaseUser); // Store Firebase user data if logged in
      } else {
        setUserData(null); // Clear user data if not logged in
      }
      setLoading(false); // Set loading to false after auth check
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  if (loading) {
    return null; // Return null or loading spinner while auth is in progress
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={userData ? 'HomeScreen' : 'WelcomeScreen'}>
          {/* Authentication Flow */}
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Reset Password' }} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ title: 'Create Account' }} />
          <Stack.Screen name="UserDataScreen" component={UserDataScreen} options={{ title: 'User Data' }} />

          {/* Main App Screens */}
          <Stack.Screen name="HomeScreen" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="DR.GPT" component={ChatScreen} options={{ title: 'DR. GPT' }} />
          <Stack.Screen name="AppointmentsScreen" component={AppointmentsScreen} options={{ title: 'R & M' }} />
          <Stack.Screen name="NearbyHospitalScreen" component={NearbyHospitalScreen} options={{ title: 'NearbyHospital' }} />
          <Stack.Screen name="FindDoctorScreen" component={FindDoctorScreen} options={{ title: 'Find Doctors' }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
          <Stack.Screen name="UserInformationScreen" component={UserInformationScreen} options={{ title: 'User Information' }} />
          <Stack.Screen name="MedicalHistoryScreen" component={MedicalHistoryScreen} options={{ title: 'Medical History' }} />
          <Stack.Screen name="LifestyleScreen" component={LifestyleScreen} options={{ title: 'Lifestyle' }} />
          <Stack.Screen name="EmergencyScreen" component={EmergencyScreen} options={{ title: 'Emergency' }} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
          <Stack.Screen name="MedicalLibraryScreen" component={MedicalLibraryScreen} options={{ title: 'Medical Library' }} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="AddictionRecovery" component={AddictionRecovery} options={{ title: 'Addiction Recovery' }} />
          <Stack.Screen name="AlternativeMedicine" component={AlternativeMedicine} options={{ title: 'Alternative Medicine' }} />
          <Stack.Screen name="AlternativeTherapies" component={AlternativeTherapies} options={{ title: 'Alternative Therapies' }} />
          <Stack.Screen name="BreathingHeartHealth" component={BreathingHeartHealth} options={{ title: 'Breathing Heart Health' }} />
          <Stack.Screen name="DiseaseManagement" component={DiseaseManagement} options={{ title: 'Disease Management' }} />
          <Stack.Screen name="Drugs" component={Drugs} options={{ title: 'Drugs' }} />
          <Stack.Screen name="EnvironmentalHealth" component={EnvironmentalHealth} options={{ title: 'Environmental Health' }} />
          <Stack.Screen name="Fitness" component={Fitness} options={{ title: 'Fitness' }} />
          <Stack.Screen name="GeneralHealth" component={GeneralHealth} options={{ title: 'General Health' }} />
          <Stack.Screen name="GeneticsMedicine" component={GeneticsMedicine} options={{ title: 'Genetics Medicine' }} />
          <Stack.Screen name="HealthNews" component={HealthNews} options={{ title: 'Health News' }} />
          <Stack.Screen name="HealthyAging" component={HealthyAging} options={{ title: 'Healthy Aging' }} />
          <Stack.Screen name="ImmuneInfectiousDiseases" component={ImmuneInfectiousDiseases} options={{ title: 'Immune & Infectious Diseases' }} />
          <Stack.Screen name="MensHealth" component={MensHealth} options={{ title: 'Men’s Health' }} />
          <Stack.Screen name="MentalHealth" component={MentalHealth} options={{ title: 'Mental Health' }} />
          <Stack.Screen name="Nutrition" component={Nutrition} options={{ title: 'Nutrition' }} />
          <Stack.Screen name="Parenting" component={Parenting} options={{ title: 'Parenting' }} />
          <Stack.Screen name="SeniorHealth" component={SeniorHealth} options={{ title: 'Senior Health' }} />
          <Stack.Screen name="SexEmotionalHealth" component={SexEmotionalHealth} options={{ title: 'Sex & Emotional Health' }} />
          <Stack.Screen name="SleepHealth" component={SleepHealth} options={{ title: 'Sleep Health' }} />
          <Stack.Screen name="TeethOralHealth" component={TeethOralHealth} options={{ title: 'Teeth & Oral Health' }} />
          <Stack.Screen name="TelemedicineTelehealth" component={TelemedicineTelehealth} options={{ title: 'Telemedicine & Telehealth' }} />
          <Stack.Screen name="WomensHealth" component={WomensHealth} options={{ title: 'Women’s Health' }} />
          <Stack.Screen name="WorkplaceHealth" component={WorkplaceHealth} options={{ title: 'Workplace Health' }} />
          <Stack.Screen name="FirstAidScreen" component={FirstAidScreen} options={{ title: 'First Aid' }} />
          <Stack.Screen name="CprAndChokingScreen" component={CprAndChokingScreen} options={{title: 'CPR & Choking'}}/>
          <Stack.Screen name="WoundBurnBleedingScreen"component={WoundBurnBleedingScreen} options={{ title: 'Burns, Cuts and Bleeding'}}/>
          <Stack.Screen name="FracturesAndSprainsScreen" component={FracturesAndSprainsScreen} options={{title: 'Frcatures and Spain'}}/>
          <Stack.Screen name="PoisonAndAllergiesScreen"component={PoisonAndAllergiesScreen} options={{ title: 'Poison and Allergies'}}/>
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ title: 'Notifications' }} />
          <Stack.Screen name="HealthTipsScreen" component={FindDoctorScreen} options={{ title: 'Doctors' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const Tabs = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  
  const handleNavigation = (screen) => {
    navigation.navigate(screen);
    closeMenu();
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#2260FF' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#000',
        headerStyle: { backgroundColor: '#2260FF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {/* Tab for Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      
      {/* Tab for DR.GPT */}
      <Tab.Screen
        name="DR. GPT"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="comments" color={color} size={size} />
          ),
          headerRight: () => (
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={<IconButton icon="dots-vertical" size={30} onPress={openMenu} />}
              style={{ color: '#FFF', position: 'absolute', top: 100, right: 15, left: 125 }}
            >
              <Menu.Item onPress={() => handleNavigation('SettingsScreen')} title="Settings" />
              <Menu.Item onPress={() => handleNavigation('ProfileScreen')} title="Profile" />
              <Menu.Item onPress={() => handleNavigation('MedicalLibraryScreen')} title="Medical Library" />
              <Menu.Item onPress={() => handleNavigation('FirstAidScreen')} title="First Aid" />
              <Menu.Item onPress={() => handleNavigation('NotificationScreen')} title="Notifications" />
              <Menu.Item onPress={() => handleNavigation('NearbyHospitalScreen')} title="NearbyHospital" />
              <Divider />
              <Menu.Item onPress={() => handleNavigation('EmergencyScreen')} title="Emergency" />
            </Menu>
          ),
        }}
      />

      {/* Tab for Appointments */}
      <Tab.Screen
        name="Reminders and Medications"
        component={AppointmentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" color={color} size={size} />
          ),
          headerRight: () => (
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={<IconButton icon="dots-vertical" size={30} onPress={openMenu} />}
              style={{ color: '#FFF', position: 'absolute', top: 100, right: 15, left: 125 }}
            >
              <Menu.Item onPress={() => handleNavigation('SettingsScreen')} title="Settings" />
              <Menu.Item onPress={() => handleNavigation('ProfileScreen')} title="Profile" />
              <Menu.Item onPress={() => handleNavigation('MedicalLibraryScreen')} title="Medical Library" />
              <Menu.Item onPress={() => handleNavigation('FirstAidScreen')} title="First Aid" />
              <Menu.Item onPress={() => handleNavigation('NearbyHospitalScreen')} title="NearbyHospital" />
              <Menu.Item onPress={() => handleNavigation('NotificationScreen')} title="Notifications" />
              <Divider />
              <Menu.Item onPress={() => handleNavigation('EmergencyScreen')} title="Emergency" />
            </Menu>
          ),
        }}
      />

      {/* Tab for Nearby Hospitals and Doctors */}
      <Tab.Screen
        name="Nearby Hospitals"
        component={NearbyHospitalScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="hospital-o" color={color} size={size} />
          ),
          headerRight: () => (
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={<IconButton icon="dots-vertical" size={30} onPress={openMenu} />}
              style={{ color: '#FFF', position: 'absolute', top: 100, right: 15, left: 125 }}
            >
              <Menu.Item onPress={() => handleNavigation('SettingsScreen')} title="Settings" />
              <Menu.Item onPress={() => handleNavigation('ProfileScreen')} title="Profile" />
              <Menu.Item onPress={() => handleNavigation('MedicalLibraryScreen')} title="Medical Library" />
              <Menu.Item onPress={() => handleNavigation('FirstAidScreen')} title="First Aid" />
              <Menu.Item onPress={() => handleNavigation('NearbyHospitalScreen')} title="NearbyHospital" />
              <Menu.Item onPress={() => handleNavigation('NotificationScreen')} title="Notifications" />
              <Divider />
              <Menu.Item onPress={() => handleNavigation('EmergencyScreen')} title="Emergency" />
            </Menu>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
