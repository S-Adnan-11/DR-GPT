import React from 'react';
import { ScrollView, View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
//import { Video } from 'expo-av';  // For video content
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const HealthLibraryScreen = () => {

  const navigation = useNavigation();

  const handleSearchButtonPress = () => {
    navigation.navigate('SearchScreen');
  };

  //categories for health library
  const categories = [
    {
      title: 'General Health & Wellness',
      description: 'Healthy habits, exercise, sleep hygiene, and stress management.',
      image: require('../../assets/LibraryPhotos/general_health.jpg'),
      link: 'GeneralHealth',
    },
    {
      title: 'Mental Health',
      description: 'Understand mental health, coping with anxiety, and depression.',
      image: require('../../assets/LibraryPhotos/mental_health.jpg'),
      link: 'MentalHealth',
    },
    {
      title: 'Nutrition & Diet',
      description: 'Balanced diet, nutrients, weight loss, and diet myths debunked.',
      image: require('../../assets/LibraryPhotos/nutrition2.jpeg'),
      link: 'Nutrition',
    },
    {
      title: 'Fitness & Exercise',
      description: 'Personalized fitness plans, benefits of regular exercise.',
      image: require('../../assets/LibraryPhotos/fitness3.jpg'),
      link: 'Fitness',
    },
    {
      title: 'Drug Information',
      description: 'Get detailed information on various drugs and medications.',
      image: require('../../assets/LibraryPhotos/drugs2.jpg'),
      link: 'Drugs',
    },
    {
      title: 'Disease Management',
      description: 'Learn how to manage and prevent chronic diseases.',
      image: require('../../assets/LibraryPhotos/disease_management.png'),
      link: 'DiseaseManagement',
    },
    {
      title: 'Health News & Trends',
      description: 'Stay updated with the latest health research, news, and innovations.',
      image: require('../../assets/LibraryPhotos/health_news.png'),
      link: 'HealthNews',
    },
    {
      title: 'Parenting & Child Health',
      description: 'Nutrition, vaccinations, and parenting tips for children’s health.',
      image: require('../../assets/LibraryPhotos/child_health.jpg'),
      link: 'Parenting',
    },
    {
      title: 'Women\'s Health',
      description: 'Pregnancy, reproductive health, and bone health for women.',
      image: require('../../assets/LibraryPhotos/women_health.jpg'),
      link: 'WomensHealth',
    },
    {
      title: 'Men\'s Health',
      description: 'Focus on fitness, mental health, and prostate care for men.',
      image: require('../../assets/LibraryPhotos/men_health.png'),
      link: 'MensHealth',
    },
    {
      title: 'Aging & Senior Health',
      description: 'Health tips for seniors, including mobility, nutrition, and aging with grace.',
      image: require('../../assets/LibraryPhotos/aging.webp'),
      link: 'SeniorHealth',
    },
    {
      title: 'Alternative Medicine & Natural Healing',
      description: 'Explore acupuncture, herbal medicine, and other alternative healing practices.',
      image: require('../../assets/LibraryPhotos/natural_medicine.jpg'),
      link: 'AlternativeMedicine',
    },
    {
      title: 'Breathing & Heart Health',
      description: 'Breathing exercises, heart health tips, and cardiovascular prevention.',
      image: require('../../assets/LibraryPhotos/heart.jpg'),
      link: 'BreathingHeartHealth',
    },
    {
      title: 'Teeth & Oral Health',
      description: 'Maintaining good oral hygiene, preventing dental issues, and more.',
      image: require('../../assets/LibraryPhotos/teeth.jpg'),
      link: 'TeethOralHealth',
    },
    {
      title: 'Environmental Health',
      description: 'The impact of pollution, climate change, and eco-friendly living.',
      image: require('../../assets/LibraryPhotos/enviroment_health.webp'),
      link: 'EnvironmentalHealth',
    },
    {
      title: 'Sex & Emotional Health',
      description: 'Managing sexual health, emotional intimacy, and relationships.',
      image: require('../../assets/LibraryPhotos/s.jpg'),
      link: 'SexEmotionalHealth',
    },
    {
      title: 'Telemedicine & Telehealth',
      description: 'Understanding telehealth, virtual doctor visits, and remote healthcare.',
      image: require('../../assets/LibraryPhotos/telehealth-and-telemedicine.png'),
      link: 'TelemedicineTelehealth',
    },
    {
      title: 'Immune System & Infectious Diseases',
      description: 'Boosting immunity, preventing infections, and understanding diseases.',
      image: require('../../assets/LibraryPhotos/immune_system.jpg'),
      link: 'ImmuneInfectiousDiseases',
    },
    {
      title: 'Sleep Health & Disorders',
      description: 'Improving sleep quality, managing disorders like insomnia.',
      image: require('../../assets/LibraryPhotos/sleep.jpg'),
      link: 'SleepHealth',
    },
    {
      title: 'Addiction & Recovery',
      description: 'Overcoming addiction, understanding recovery processes, and support.',
      image: require('../../assets/LibraryPhotos/addiction.webp'),
      link: 'AddictionRecovery',
    },
    {
      title: 'Genetics & Personalized Medicine',
      description: 'How genetics shape your health and personalized treatment options.',
      image: require('../../assets/LibraryPhotos/genetics.jpg'),
      link: 'GeneticsMedicine',
    },
    {
      title: 'Workplace Health & Ergonomics',
      description: 'Improving posture, ergonomics, and managing work stress.',
      image: require('../../assets/LibraryPhotos/ergonomics.jpg'),
      link: 'WorkplaceHealth',
    },
    {
      title: 'Alternative Therapies',
      description: 'Exploring acupuncture, reflexology, herbal remedies, and more.',
      image: require('../../assets/LibraryPhotos/natural_medicine.jpg'),
      link: 'AlternativeTherapies',
    },
    {
      title: 'Healthy Aging & Longevity',
      description: 'Tips for aging gracefully and living a longer, healthier life.',
      image: require('../../assets/LibraryPhotos/longevity.png'),
      link: 'HealthyAging',
    },
    //more categories. i think things about eye. whoever wants can help lool!
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Main Header Section */}
      <ImageBackground source={require('../../assets/LibraryPhotos/medical_library.jpg')} style={styles.headerImage}>
        <Text style={styles.headerText}>Welcome to the Health Library</Text>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonPress}>
          <MaterialCommunityIcons name="magnify" size={24} color="white" />
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Medical Shelf Header */}
      <Text style={styles.shelfHeader}>Medical Shelf</Text>

      {/* Category Cards */}
      <View style={styles.cardsContainer}>
        {categories.map((category, index) => (
          <Card key={index} style={styles.card} onPress={() => navigation.navigate(category.link)}>
            <Card.Cover source={category.image} style={styles.cardImage} />
            <Card.Content>
              <Title>{category.title}</Title>
              <Paragraph>{category.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate(category.link)} style={styles.button}>
                <Text style={styles.buttonText}>Explore</Text>
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>

      {/* Example Video Section 
      <Text style={styles.sectionHeader}>Featured Video</Text>
      <Video
        source={{ uri: 'https://www.youtube.com/watch?v=vCqoIFuBuic' }} // Replace with a valid video URL
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay
        isLooping
        style={styles.video}
      />*/}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerImage: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    position: 'relative',
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  searchButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  shelfHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2260FF',
    marginTop: 20,
    marginLeft: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  card: {
    width: 300,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardImage: {
    height: 180,
    borderRadius: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 20,
    color: '#2260FF',
  },
  video: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  controlsContainer: {
    padding: 10,
  },
  button: {
    borderWidth: 2.5,
    borderColor: '#2260FF',
    marginTop: 10,
  },
  buttonText: {
    color: '#2260FF',
    fontSize: 15,
  },
});

export default HealthLibraryScreen;
