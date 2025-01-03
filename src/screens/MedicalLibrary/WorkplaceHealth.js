import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const WorkplaceHealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.cdc.gov/workplacehealthpromotion'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/ergonomics.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Workplace Health</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>Importance of Workplace Health</Text>
        <Text style={styles.sectionText}>
          Maintaining good health at the workplace is essential for employees' well-being and productivity. A healthy workplace
          can prevent illness, reduce stress, and promote a better work-life balance. Both employees and employers should take
          measures to ensure that the work environment supports health.
        </Text>

        <Text style={styles.sectionTitle}>Common Workplace Health Issues</Text>
        <Text style={styles.sectionText}>
          Common health issues that affect employees in the workplace include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Stress: Chronic stress can lead to mental and physical health problems.</Text>
          <Text style={styles.boxText}>- Musculoskeletal Disorders: Repetitive movements or poor posture can lead to pain and injury.</Text>
          <Text style={styles.boxText}>- Obesity: Sedentary lifestyles and poor diet can contribute to obesity.</Text>
          <Text style={styles.boxText}>- Mental Health: Anxiety, depression, and burnout are common in high-pressure jobs.</Text>
        </View>

        <Text style={styles.sectionTitle}>Tips for Promoting Health in the Workplace</Text>
        <Text style={styles.sectionText}>
          Employers and employees can both take steps to create a healthier workplace:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Encourage regular physical activity during breaks (e.g., walking meetings).</Text>
          <Text style={styles.boxText}>2. Offer wellness programs such as gym memberships or mindfulness sessions.</Text>
          <Text style={styles.boxText}>3. Create a supportive environment where employees feel comfortable discussing mental health.</Text>
          <Text style={styles.boxText}>4. Provide ergonomic workstations to reduce the risk of musculoskeletal injuries.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for Workplace Health</Text>
        <Text style={styles.sectionText}>
          For more resources on workplace health and wellness, visit the following trusted sites:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [CDC: Workplace Health Promotion](https://www.cdc.gov/workplacehealthpromotion) (Guidelines and strategies for promoting health at work)</Text>
          <Text style={styles.boxText}>- [Occupational Safety and Health Administration (OSHA)](https://www.osha.gov) (Workplace safety and health regulations)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Workplace Health</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more resources on Workplace Health from CDC.
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

export default WorkplaceHealthScreen;
