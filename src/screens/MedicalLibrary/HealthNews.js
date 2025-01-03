import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const HealthNewsScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.who.int/news-room');
  };
  const everydayHealth = () => {
    Linking.openURL('https://www.everydayhealth.com/');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/health_news2.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}></Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What is Health News?</Text>
        <Text style={styles.sectionText}>
          Health news refers to the latest updates, breakthroughs, and advancements in healthcare, medicine, and public health. Staying informed about the latest trends and developments in health is crucial for understanding new treatments, preventive measures, and the overall state of public health.
        </Text>

        <Text style={styles.sectionTitle}>Current Health Trends and Breakthroughs</Text>
        <Text style={styles.sectionText}>
          Recent news in the healthcare sector covers a variety of topics, from innovative medical research to new treatments and preventive measures. Some of the hot topics in health include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- COVID-19 Updates: Ongoing research into treatments, vaccines, and global health policies to combat the pandemic.</Text>
          <Text style={styles.boxText}>- Mental Health Awareness: Growing recognition of the importance of mental health and wellness, and the need for improved access to care.</Text>
          <Text style={styles.boxText}>- Telemedicine Advancements: The rise of telehealth services, making healthcare more accessible and convenient for people worldwide.</Text>
          <Text style={styles.boxText}>- Cancer Research: New treatments and early detection techniques being developed to fight cancer more effectively.</Text>
        </View>

        <Text style={styles.sectionTitle}>Key Health Issues in 2025</Text>
        <Text style={styles.sectionText}>
          Some major health issues and challenges are expected to dominate headlines in 2025:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Aging Population: Addressing the challenges of an aging population and the increased demand for healthcare services.</Text>
          <Text style={styles.boxText}>2. Global Health Inequities: Tackling the disparities in healthcare access and outcomes between different populations.</Text>
          <Text style={styles.boxText}>3. Environmental Health: Understanding how environmental factors like pollution and climate change affect public health.</Text>
          <Text style={styles.boxText}>4. New Infectious Diseases: Monitoring the emergence of new infectious diseases and ensuring global preparedness.</Text>
        </View>

        <Text style={styles.sectionTitle}>Stay Updated with the Latest Health News</Text>
        <Text style={styles.sectionText}>
          For real-time updates on health news, visit trusted sources such as:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [World Health Organization News](https://www.who.int/news-room)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Health News</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for the latest health news and global health updates.
        </Text>
        <Text style={styles.externalLink} onPress={everydayHealth}>
          Click here for the latest health news and global health updates from Everyday Health
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

export default HealthNewsScreen;
