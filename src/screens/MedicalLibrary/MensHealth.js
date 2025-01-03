import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const MensHealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.menshealth.com'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/mens_health2.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Men's Health</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>The Importance of Men's Health</Text>
        <Text style={styles.sectionText}>
          Men's health is often overlooked, but it is just as important as any other aspect of well-being. Regular health checks,
          a balanced diet, exercise, and mental health care are essential for men of all ages. Men are at higher risk for certain
          conditions, so taking proactive steps to maintain health can significantly improve quality of life.
        </Text>

        <Text style={styles.sectionTitle}>Common Health Issues in Men</Text>
        <Text style={styles.sectionText}>
          Men face unique health challenges throughout their lives. Some of the most common health issues affecting men include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Heart Disease: The leading cause of death for men, often preventable with a healthy lifestyle.</Text>
          <Text style={styles.boxText}>2. Erectile Dysfunction: A common issue that affects men of various ages, and can be a sign of underlying health problems.</Text>
          <Text style={styles.boxText}>3. Prostate Cancer: One of the most common cancers in men, with early detection offering the best treatment options.</Text>
          <Text style={styles.boxText}>4. Mental Health Issues: Men are less likely to seek help for depression or anxiety, which can worsen their conditions.</Text>
          <Text style={styles.boxText}>5. Diabetes: Men are more likely to develop type 2 diabetes due to lifestyle factors such as diet and lack of exercise.</Text>
        </View>

        <Text style={styles.sectionTitle}>Maintaining Good Health: Tips for Men</Text>
        <Text style={styles.sectionText}>
          Healthy habits can make a world of difference in maintaining overall health. Here are some key habits to incorporate into daily
          life for a healthier and happier future:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Stay Active: Regular exercise can lower the risk of chronic diseases and improve mental health.</Text>
          <Text style={styles.boxText}>2. Eat a Balanced Diet: Incorporate plenty of fruits, vegetables, lean proteins, and whole grains into your meals.</Text>
          <Text style={styles.boxText}>3. Get Enough Sleep: Aim for 7-9 hours of sleep per night for optimal health and energy.</Text>
          <Text style={styles.boxText}>4. Regular Health Checkups: Don’t skip your yearly physical exam and screenings for heart disease, prostate health, and other conditions.</Text>
          <Text style={styles.boxText}>5. Manage Stress: Practice mindfulness, meditation, or engage in hobbies to reduce stress levels.</Text>
        </View>

        <Text style={styles.sectionTitle}>Mental Health in Men</Text>
        <Text style={styles.sectionText}>
          Mental health is a significant yet often neglected part of men’s health. Men may experience mental health challenges like
          depression, anxiety, and stress, but they tend to be less likely to seek help.
        </Text>
        <Text style={styles.sectionText}>
          It’s important for men to understand that mental health struggles are normal and seeking support can lead to positive changes.
        </Text>

        <Text style={styles.sectionTitle}>External Resources for Men’s Health</Text>
        <Text style={styles.sectionText}>
          For further reading and resources on men's health, consider visiting the following trusted organizations:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [Men's Health](https://www.menshealth.com) (Website for fitness, health, and lifestyle articles)</Text>
          <Text style={styles.boxText}>- [Prostate Cancer Foundation](https://www.pcf.org) (Information on prostate cancer awareness and prevention)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Men's Health</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more resources on Men's Health from Men's Health Magazine.
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

export default MensHealthScreen;
