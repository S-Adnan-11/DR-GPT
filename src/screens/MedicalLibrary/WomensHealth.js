import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking, TouchableOpacity } from 'react-native';

const WomensHealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.womenshealth.gov'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/fitness2.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Women's Health</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>The Importance of Women's Health</Text>
        <Text style={styles.sectionText}>
          Women face unique health challenges that vary by age, lifestyle, and genetics. Women's health is not just about reproductive
          health—it's also about heart health, mental well-being, bone density, and so much more. It is essential to prioritize your
          health at every stage of life, from adolescence to menopause and beyond.
        </Text>

        <Text style={styles.sectionTitle}>Common Health Issues in Women</Text>
        <Text style={styles.sectionText}>
          Women experience a range of health issues, some of which are gender-specific. Here are some of the most common health
          challenges women face:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Breast Cancer: One of the most common cancers in women, but with early detection, it is treatable.</Text>
          <Text style={styles.boxText}>2. Osteoporosis: Women are at greater risk for osteoporosis, a condition that weakens bones and increases fracture risk.</Text>
          <Text style={styles.boxText}>3. Heart Disease: Women often have different heart disease symptoms than men and may be underdiagnosed.</Text>
          <Text style={styles.boxText}>4. Mental Health Issues: Anxiety, depression, and stress are common in women, particularly during hormonal changes.</Text>
          <Text style={styles.boxText}>5. Polycystic Ovary Syndrome (PCOS): A hormonal imbalance that can affect fertility and lead to other health issues.</Text>
        </View>

        <Text style={styles.sectionTitle}>Maintaining Good Health: Tips for Women</Text>
        <Text style={styles.sectionText}>
          To maintain overall health, women should focus on a holistic approach that combines physical, emotional, and mental health.
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Stay Active: Regular exercise helps reduce the risk of chronic diseases and boosts mood.</Text>
          <Text style={styles.boxText}>2. Eat a Balanced Diet: Include nutrient-dense foods like leafy greens, fruits, and healthy fats.</Text>
          <Text style={styles.boxText}>3. Get Enough Sleep: Sleep is crucial for hormonal balance, mood regulation, and overall well-being.</Text>
          <Text style={styles.boxText}>4. Manage Stress: Practice mindfulness, yoga, or journaling to reduce stress and prevent burnout.</Text>
          <Text style={styles.boxText}>5. Regular Screenings: Regular visits to your healthcare provider and screenings like mammograms can help with early detection.</Text>
        </View>

        <Text style={styles.sectionTitle}>Mental Health in Women</Text>
        <Text style={styles.sectionText}>
          Mental health issues are particularly prevalent in women due to hormonal fluctuations, social pressures, and other life stressors.
          It's important for women to acknowledge mental health struggles and seek support when necessary.
        </Text>

        <Text style={styles.sectionTitle}>External Resources for Women's Health</Text>
        <Text style={styles.sectionText}>
          For more information on women’s health and resources, explore these trusted organizations:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [Women's Health](https://www.womenshealth.gov) (Comprehensive resources on health topics for women)</Text>
          <Text style={styles.boxText}>- [National Women's Health Network](https://www.nwhn.org) (Advocacy and health education)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Women's Health</Text>
        <TouchableOpacity onPress={handleLearnMore}>
          <Text style={styles.externalLink}>
            Click here for more resources on Women's Health from the U.S. Department of Health & Human Services.
          </Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adding overlay for better text visibility
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
    textAlign: 'center',
    paddingHorizontal: 20, // Ensure text doesn't touch edges on smaller screens
  },
  articleContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2260FF',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    marginBottom: 18,
    letterSpacing: 0.5, // Improved readability
  },
  textBox: {
    backgroundColor: '#e6f7ff', // Lighter box background for contrast
    padding: 18,
    borderRadius: 10,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  boxText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  externalResource: {
    backgroundColor: '#e0f7fa',
    padding: 20,
    marginTop: 30,
    borderRadius: 12,
    shadowColor: '#00796b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  externalLink: {
    fontSize: 18,
    color: '#00796b',
    textDecorationLine: 'underline',
    textAlign: 'center',
    paddingVertical: 10, // Adds spacing for touch areas
  },
});

export default WomensHealthScreen;
