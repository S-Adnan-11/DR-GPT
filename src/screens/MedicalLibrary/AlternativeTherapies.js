import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const AlternativeTherapiesScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://nccih.nih.gov'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/natural_medicine.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Alternative Therapies</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What Are Alternative Therapies?</Text>
        <Text style={styles.sectionText}>
          Alternative therapies, also known as complementary or integrative medicine, encompass a wide variety of treatments
          that fall outside conventional Western medicine. These therapies are used to treat various conditions or as an adjunct
          to standard medical treatments. Some of the most popular alternative therapies include acupuncture, herbal medicine,
          chiropractic care, and massage therapy.
        </Text>

        <Text style={styles.sectionTitle}>Popular Alternative Therapies</Text>
        <Text style={styles.sectionText}>
          There are numerous alternative therapies available today, each with its own benefits. Here are some common types:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Acupuncture: A traditional Chinese practice that involves inserting thin needles into the body to stimulate healing.</Text>
          <Text style={styles.boxText}>- Herbal Medicine: The use of plant-based substances for therapeutic purposes, such as ginseng, turmeric, and echinacea.</Text>
          <Text style={styles.boxText}>- Chiropractic Care: Focuses on diagnosing and treating musculoskeletal disorders, especially those involving the spine.</Text>
          <Text style={styles.boxText}>- Massage Therapy: Manual manipulation of the muscles and soft tissues to relieve tension and pain.</Text>
          <Text style={styles.boxText}>- Meditation & Mindfulness: Techniques to promote relaxation and mental clarity, often used to reduce stress.</Text>
        </View>

        <Text style={styles.sectionTitle}>Benefits of Alternative Therapies</Text>
        <Text style={styles.sectionText}>
          Alternative therapies can offer several benefits for overall well-being. These include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Pain management: Many alternative therapies help alleviate chronic pain and discomfort.</Text>
          <Text style={styles.boxText}>2. Stress reduction: Meditation, yoga, and massage therapy are known to reduce stress and anxiety.</Text>
          <Text style={styles.boxText}>3. Improved sleep: Certain therapies, like aromatherapy, are believed to improve sleep quality.</Text>
          <Text style={styles.boxText}>4. Enhanced mental clarity: Practices like mindfulness can improve focus and cognitive function.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for Alternative Therapies</Text>
        <Text style={styles.sectionText}>
          For more information on alternative therapies and their benefits, you can explore the following resources:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [National Center for Complementary and Integrative Health](https://nccih.nih.gov)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Alternative Therapies</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here to explore more about Alternative Therapies.
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

export default AlternativeTherapiesScreen;
