import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Animated, ActivityIndicator, Alert, StyleSheet, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';
import { Text, IconButton, Card, FAB, Menu, Divider } from 'react-native-paper';
import Colors from '../constants/Colors';
import { getHealthTips, fetchDocumentById } from '../constants/firebaseFunctions';
import { auth, onAuthStateChanged } from '../constants/FireBaseConfig';
import generateHealthTips from '../constants/utils/generateHealthTips';

const HomeScreen = ({ navigation }) => {
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(["Healthy Eating", "Stress Management", "Benefits of Yoga"]);
  const [healthTipsData, setHealthTipsData] = useState([]);
  const [loadingHealthTips, setLoadingHealthTips] = useState(true);
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTip, setSelectedTip] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [greeting, setGreeting] = useState('Good Morning'); // Static greeting state
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state changed, user:", firebaseUser);
      if (firebaseUser) {
        fetchUserData(firebaseUser.uid);
        setGreetingBasedOnTime(); // Set greeting when user logs in
      } else {
        setUserName('');
        setGreeting('Good Morning'); // Default greeting if no user logged in
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    try {
      const userData = await fetchDocumentById('users', userId);
      if (userData && userData.name) {
        setUserName(userData.name);
        fetchHealthTips(userId);
      } else {
        throw new Error('No user data found for the provided userId');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage('Failed to load user data. Please try again.');
    }
  };

  const fetchHealthTips = async (userId) => {
    setLoadingHealthTips(true);
    setErrorMessage('');
    try {
      const tips = await getHealthTips(userId);
      if (tips && tips.healthTips) {
        setHealthTipsData(tips.healthTips);
      } else {
        const newTips = await generateHealthTips(userId);
        if (newTips && newTips.tips) {
          setHealthTipsData(newTips.tips);
        } else {
          throw new Error('No health tips generated');
        }
      }
    } catch (error) {
      console.error('Error fetching or generating health tips:', error);
      setErrorMessage('Failed to fetch or generate health tips. Please try again.');
    } finally {
      setLoadingHealthTips(false);
    }
  };



  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedTip(null);
  };
  const setGreetingBasedOnTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Night');
    }
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    const filtered = ["Healthy Eating", "Stress Management", "Benefits of Yoga"].filter(article =>
      article.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
    closeMenu();
  };

  const handleEmergency = () => {
    navigation.navigate('EmergencyScreen');
  };

  const renderErrorMessage = () => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
    }
  };

  useEffect(() => {
    renderErrorMessage();
  }, [errorMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (healthTipsData.length > 0) {
        // Ensure nextIndex is within bounds of the healthTipsData length
        const nextIndex = (currentIndex + 1) % healthTipsData.length;

        // Only update if the index is different to avoid unnecessary updates
        if (nextIndex !== currentIndex) {
          setCurrentIndex(nextIndex);
          try {
            flatListRef.current?.scrollToIndex({
              index: nextIndex,
              animated: true,
            });
          } catch (error) {
            console.warn('Error scrolling to index:', error);
          }
        }
      }
    }, 11000);


    return () => clearInterval(interval);
  }, [currentIndex, healthTipsData]);

  const handleCardPress = (tip) => {
    setSelectedTip(tip);
    setIsModalVisible(true);
  };

  // Hide quote after a certain time
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuoteVisible(false);
    }, 7000); // Quote fades away after 7 seconds
    return () => clearTimeout(timer);
  }, []);


  const renderArticleCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{item}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <IconButton
            icon="account"
            size={60}
            style={styles.profileIcon}
            onPress={() => navigation.navigate('ProfileScreen')}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          <IconButton
            icon="bell"
            size={25}
            style={styles.notificationIcon}
            onPress={() => navigation.navigate('NotificationScreen')}
          />
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="dots-vertical" size={30} onPress={openMenu} />}
            style={styles.menu}
          >
            <Menu.Item onPress={() => handleNavigation('SettingsScreen')} title="Settings" />
            <Menu.Item onPress={() => handleNavigation('ProfileScreen')} title="Profile" />
            <Menu.Item onPress={() => handleNavigation('MedicalLibraryScreen')} title="Medical Library" />
            <Menu.Item onPress={() => handleNavigation('NearbyHospitalScreen')} title="NearbyHospital" />

            <Menu.Item onPress={() => handleNavigation('FirstAidScreen')} title="First Aid" />
            <Divider />
            <Menu.Item onPress={() => handleNavigation('EmergencyScreen')} title="Emergency" />
          </Menu>
        </View>
        <Text variant="headlineLarge" style={styles.headerText}>
          {greeting}, {userName || 'User'}!
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>Let’s prioritize your health today.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Animated Quote Section */}
        {quoteVisible && (
          <Animated.View style={[styles.quoteCard, { opacity: fadeAnim }]}>
            <Text style={styles.quoteText}>"The greatest wealth is health." – Virgil</Text>
          </Animated.View>
        )}

        {/* Quick Links */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>Healthcare Services</Text>
        <View style={styles.quickLinksContainer}>
          {[
            { icon: 'chat', title: 'Dr.GPT', screen: 'DR.GPT' },
            { icon: 'heart', title: 'Health Records', screen: 'HealthTipsScreen' },
            { icon: 'hospital-building', title: 'Nearby Hospitals', screen: 'NearbyHospitalScreen' },
          ].map((item, index) => (
            <Card key={index} style={styles.quickLinkCard} onPress={() => navigation.navigate(item.screen)}>
              <IconButton icon={item.icon} size={40} style={styles.quickLinkIcon} />
              <Text style={styles.quickLinkText}>{item.title}</Text>
            </Card>
          ))}
        </View>

        {/* Health Tips Section */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>Health Tips</Text>
        {loadingHealthTips ? (
          <ActivityIndicator size="large" color={Colors.primary} style={styles.loadingIndicator} />
        ) : (
          <FlatList
            ref={flatListRef}
            data={healthTipsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCardPress(item)}>
                <Card style={styles.healthTipCard}>
                  <Text style={styles.healthTipTitle}>{item.title}</Text>
                  <Text style={styles.healthTipDescription}>{item.content}</Text>
                </Card>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Modal for Enlarged Health Tip */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedTip?.title}</Text>
                <Text style={styles.modalDescription}>{selectedTip?.content}</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={styles.cancelButton}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Trending Articles Section */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>Trending Articles</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.articlesContainer}>
          {filteredArticles.map((article, index) => (
            <TouchableOpacity key={index}>
              <Card style={styles.articleCard}>
                <Text style={styles.articleText}>{article}</Text>
                <Text style={styles.articleDescription}>Read more about {article}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Emergency Button */}
      <FAB
        style={styles.emergencyButton}
        icon="phone"
        label="Emergency"
        color="#FFF"
        onPress={handleEmergency}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 65,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menu: {
    color: '#FFF', position: 'absolute', top: 150, right: 15, left: 125
  },
  headerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 32,
  },
  subtitle: {
    color: '#D0D9FF',
    fontSize: 16,
    marginTop: 5,
  },
  profileIcon: {
    backgroundColor: '#FFFFFF33',
  },
  notificationIcon: {
    backgroundColor: '#FFFFFF33',
  },
  searchBar: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 5,
    width: '50%',
  },
  scrollContent: {
    padding: 20,
  },
  quoteCard: {
    backgroundColor: '#F9FAF8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#2D5C2E',
    textAlign: 'center',
  },
  sectionHeader: {
    fontWeight: '700',
    fontSize: 22,
    color: '#333',
    marginBottom: 5,
    marginTop: 20,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  quickLinkCard: {
    width: 110,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F5FF',
    borderRadius: 15,
    padding: 10,
  },
  quickLinkIcon: {
    backgroundColor: '#D7E9F7',
    marginBottom: 10,
  },
  quickLinkText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  healthTipCard: {
    width: 330,
    minHeight: 200,
    padding: 15,
    backgroundColor: '#E1F5FE',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    margin: 30,
    marginLeft: 5,
  },
  healthTipTitle: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#01579B',
    textAlign: 'left',
    marginBottom: 7,
    maxWidth: 250
  },
  healthTipDescription: {
    fontSize: 15,
    color: '#01579B',
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  articlesContainer: {
    marginTop: 20,
  },
  articleCard: {
    width: 330,
    minHeight: 200,
    padding: 15,
    backgroundColor: '#E1F5FE',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    margin: 30,
    marginLeft: 5,
  },
  articleText: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#01579B',
    textAlign: 'left',
    marginBottom: 7,
    maxWidth: 250
  },
  articleDescription: {
    fontSize: 14,
    color: '#01579B',
    textAlign: 'left',
    marginTop: 5,
  },
  emergencyButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    borderRadius: 100,
    backgroundColor: '#D91656',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darken background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'left',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    justifyContent: 'left'
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'left',
  },
  cancelButton: {
    fontSize: 18,
    color: Colors.primaryColor,
    marginTop: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center'
  },
});

export default HomeScreen;