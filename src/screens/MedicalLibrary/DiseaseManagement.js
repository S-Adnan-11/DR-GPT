import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const DiseaseManagementScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.cdc.gov/chronicdisease'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/disease_management3.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Disease Management</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What Is Disease Management?</Text>
        <Text style={styles.sectionText}>
          Disease management refers to the efforts made to manage and treat chronic diseases to improve quality of life and
          prevent complications. Chronic diseases such as diabetes, hypertension, and asthma require ongoing care and attention
          to prevent worsening and improve health outcomes.
        </Text>

        <Text style={styles.sectionTitle}>Key Components of Disease Management</Text>
        <Text style={styles.sectionText}>
          Successful disease management programs include several key components:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Regular Monitoring: Continuous tracking of symptoms and vital signs.</Text>
          <Text style={styles.boxText}>- Medication Management: Ensuring patients take medications as prescribed.</Text>
          <Text style={styles.boxText}>- Education: Providing patients with the necessary knowledge to manage their condition.</Text>
          <Text style={styles.boxText}>- Lifestyle Modifications: Encouraging healthy habits like a balanced diet and exercise.</Text>
        </View>

        <Text style={styles.sectionTitle}>Disease Management for Specific Conditions</Text>
        <Text style={styles.sectionText}>
          Disease management varies depending on the condition. Some examples include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Diabetes: Blood sugar monitoring, insulin management, and dietary control.</Text>
          <Text style={styles.boxText}>- Hypertension: Blood pressure management, medication adherence, and reducing salt intake.</Text>
          <Text style={styles.boxText}>- Asthma: Regular use of inhalers, avoiding triggers, and proper breathing techniques.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for Disease Management</Text>
        <Text style={styles.sectionText}>
          For more information on disease management programs, visit:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [CDC: Chronic Disease Management](https://www.cdc.gov/chronicdisease)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Disease Management</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more resources on Disease Management from CDC.
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

export default DiseaseManagementScreen;
