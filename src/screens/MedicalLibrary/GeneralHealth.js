import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const GeneralHealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.who.int/health-topics/general-health'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/general_health.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}></Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What is General Health?</Text>
        <Text style={styles.sectionText}>
          General health refers to the overall physical, mental, and social well-being of an individual. It encompasses a wide range of factors, including diet, exercise, sleep, and mental health, all of which contribute to a person's quality of life.
        </Text>

        <Text style={styles.sectionTitle}>Key Components of General Health</Text>
        <Text style={styles.sectionText}>
          Achieving and maintaining good general health requires attention to various aspects of well-being. Some of the key components include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Nutrition: Eating a balanced diet with the right nutrients is essential for maintaining energy levels and preventing chronic diseases.</Text>
          <Text style={styles.boxText}>- Physical Activity: Regular exercise is important for building strength, improving cardiovascular health, and maintaining flexibility.</Text>
          <Text style={styles.boxText}>- Sleep: Getting sufficient, high-quality sleep is necessary for recovery, energy, and mental clarity.</Text>
          <Text style={styles.boxText}>- Mental Health: Managing stress, practicing mindfulness, and seeking support when needed contribute to emotional and psychological well-being.</Text>
        </View>

        <Text style={styles.sectionTitle}>Maintaining Good General Health</Text>
        <Text style={styles.sectionText}>
          Maintaining general health is a lifelong process. Here are some tips to promote overall wellness:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins.</Text>
          <Text style={styles.boxText}>2. Exercise regularly, aiming for at least 30 minutes of moderate activity most days of the week.</Text>
          <Text style={styles.boxText}>3. Practice good sleep hygiene, such as setting a regular sleep schedule and limiting screen time before bed.</Text>
          <Text style={styles.boxText}>4. Stay hydrated by drinking enough water throughout the day.</Text>
          <Text style={styles.boxText}>5. Take time for self-care and stress management, such as practicing deep breathing, yoga, or meditation.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for General Health</Text>
        <Text style={styles.sectionText}>
          For more information on general health and wellness, visit:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [World Health Organization - General Health](https://www.who.int/health-topics/general-health)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About General Health</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here to explore more about general health and wellness.
        </Text>
      </View>
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
  articleContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2260FF',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  textBox: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  boxText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  externalResource: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    marginTop: 30,
    borderRadius: 8,
  },
  externalLink: {
    fontSize: 16,
    color: '#00796b',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default GeneralHealthScreen;
