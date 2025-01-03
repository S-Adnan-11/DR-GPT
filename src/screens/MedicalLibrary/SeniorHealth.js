import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const SeniorHealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.aging.com'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/aging2.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Senior Health</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>Healthy Aging</Text>
        <Text style={styles.sectionText}>
          As we age, it's important to focus on maintaining our physical and mental health. A healthy lifestyle can help reduce the
          risk of chronic diseases, improve mobility, and increase quality of life.
        </Text>

        <Text style={styles.sectionTitle}>Key Aspects of Senior Health</Text>
        <Text style={styles.sectionText}>
          Here are some important factors to consider for healthy aging:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Regular Exercise: Staying active helps with balance, strength, and overall well-being.</Text>
          <Text style={styles.boxText}>2. Balanced Diet: Eating a variety of nutrient-dense foods supports the immune system and energy levels.</Text>
          <Text style={styles.boxText}>3. Mental Health: Keeping the mind sharp through social engagement and cognitive activities is vital.</Text>
          <Text style={styles.boxText}>4. Regular Checkups: Preventive care and screenings can detect issues early and improve outcomes.</Text>
          <Text style={styles.boxText}>5. Medication Management: Properly managing medications can help avoid potential health complications.</Text>
        </View>

        <Text style={styles.sectionTitle}>Managing Chronic Conditions</Text>
        <Text style={styles.sectionText}>
          Many seniors face chronic conditions, such as diabetes, hypertension, and arthritis. Here are some strategies for managing
          chronic health conditions:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Follow Medical Advice: Consistently follow the prescribed treatment plans.</Text>
          <Text style={styles.boxText}>2. Healthy Lifestyle: Maintain a healthy weight, exercise regularly, and eat a nutritious diet.</Text>
          <Text style={styles.boxText}>3. Monitor Symptoms: Keep track of any changes in symptoms and report them to your healthcare provider.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for Senior Health</Text>
        <Text style={styles.sectionText}>
          For more information and resources on senior health, explore the following websites:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [Aging.com](https://www.aging.com) (Information on aging and health-related resources)</Text>
          <Text style={styles.boxText}>- [National Institute on Aging](https://www.nia.nih.gov) (Research, programs, and health information for seniors)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Senior Health</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more resources on Senior Health from Aging.com.
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

export default SeniorHealthScreen;
