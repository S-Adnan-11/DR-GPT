import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const HealthyAging = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.aging.org'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/longevity.png')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Healthy Aging: Tips and Strategies</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What is Healthy Aging?</Text>
        <Text style={styles.sectionText}>
          Healthy aging refers to the process of growing older while maintaining good physical, mental, and emotional health. It involves adopting healthy lifestyle habits, staying physically active, eating a balanced diet, and managing stress. Healthy aging is not about avoiding aging but embracing it with positivity and vitality.
        </Text>

        <Text style={styles.sectionTitle}>Key Components of Healthy Aging</Text>
        <Text style={styles.sectionText}>
          There are several key components to achieving healthy aging:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Regular Physical Activity: Exercise is essential for maintaining strength, mobility, and overall health as we age.</Text>
          <Text style={styles.boxText}>- Mental Health and Cognitive Function: Keeping the brain active through activities like reading, puzzles, and socializing helps prevent cognitive decline.</Text>
          <Text style={styles.boxText}>- Nutrition: A balanced diet rich in vitamins, minerals, and antioxidants supports the body's health and prevents chronic diseases.</Text>
          <Text style={styles.boxText}>- Social Connections: Staying connected with family and friends improves mental well-being and reduces feelings of loneliness.</Text>
          <Text style={styles.boxText}>- Regular Health Check-ups: Early detection of health issues can help prevent serious conditions in the future.</Text>
        </View>

        <Text style={styles.sectionTitle}>Tips for Healthy Aging</Text>
        <Text style={styles.sectionText}>
          Some practical tips for aging gracefully and maintaining health:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Stay active: Aim for at least 150 minutes of moderate physical activity each week.</Text>
          <Text style={styles.boxText}>2. Eat a balanced diet: Focus on whole foods like fruits, vegetables, lean proteins, and healthy fats.</Text>
          <Text style={styles.boxText}>3. Get adequate sleep: Aim for 7-9 hours of sleep each night to support overall health.</Text>
          <Text style={styles.boxText}>4. Engage in social activities: Whether through hobbies, volunteering, or spending time with loved ones, social interaction is key.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources on Healthy Aging</Text>
        <Text style={styles.sectionText}>
          For more information on healthy aging, visit the following resource:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [Aging.org](https://www.aging.org)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Healthy Aging</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for additional information on healthy aging.
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

export default HealthyAging;
