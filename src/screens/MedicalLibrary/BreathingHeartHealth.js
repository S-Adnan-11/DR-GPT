import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const BreathingHeartHealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.youtube.com/watch?v=vCqoIFuBuic'); // Example YouTube link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/heart.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Breathing and Heart Health</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>The Importance of Breathing for Heart Health</Text>
        <Text style={styles.sectionText}>
          Breathing is often something we take for granted, but it plays a critical role in heart health. Proper breathing
          can improve oxygen flow, reduce stress, and ultimately support a healthy cardiovascular system. Studies have shown
          that practicing deep breathing exercises can lower blood pressure and improve heart function.
        </Text>

        <Text style={styles.sectionTitle}>How Breathing Affects the Heart</Text>
        <Text style={styles.sectionText}>
          Our heart rate is directly influenced by our breathing pattern. Slow, deep breaths can stimulate the parasympathetic
          nervous system, promoting relaxation and reducing the stress on the heart. Conversely, shallow or rapid breathing
          can lead to an increased heart rate and higher blood pressure, which puts strain on the cardiovascular system.
        </Text>

        <Text style={styles.sectionTitle}>Breathing Techniques for Better Heart Health</Text>
        <Text style={styles.sectionText}>
          Here are a few breathing techniques you can try to improve your heart health:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Diaphragmatic Breathing: Focus on deep belly breathing to activate the diaphragm.</Text>
          <Text style={styles.boxText}>2. Box Breathing: Inhale for 4 seconds, hold for 4, exhale for 4, and hold again for 4 seconds.</Text>
          <Text style={styles.boxText}>3. 4-7-8 Breathing: Inhale for 4 seconds, hold for 7, and exhale for 8 seconds.</Text>
        </View>

        <Text style={styles.sectionTitle}>Why Stress Reduction is Key</Text>
        <Text style={styles.sectionText}>
          Stress has a significant impact on heart health, and deep breathing can help reduce stress levels. By incorporating
          breathing exercises into your daily routine, you can help manage stress and support your heart’s overall health. 
          Regular practice of breathing techniques is linked with better mental and emotional well-being.
        </Text>

        <Text style={styles.sectionTitle}>The Connection Between Breathing and Exercise</Text>
        <Text style={styles.sectionText}>
          Exercise is another vital aspect of maintaining heart health, and breathing plays a crucial role in how effectively
          we perform during physical activity. Proper breathing during exercise allows for better oxygen exchange and helps
          the heart pump blood more efficiently, ensuring that muscles and organs receive adequate oxygen.
        </Text>

        <Text style={styles.sectionTitle}>Breathing for Stress Relief</Text>
        <Text style={styles.sectionText}>
          Studies show that taking slow, deep breaths can activate the parasympathetic nervous system, which is responsible
          for rest and digestion. By practicing stress-reducing breathing techniques, you can combat the effects of chronic stress
          on the heart and improve your overall well-being.
        </Text>

        <Text style={styles.sectionText}>
          As you begin your journey to better heart health, remember that proper breathing is a simple but powerful tool that
          can have profound effects on your physical and mental well-being. Incorporate these techniques into your routine and
          see how they improve your quality of life.
        </Text>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Breathing and Heart Health</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here to watch a helpful video on breathing exercises for heart health
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

export default BreathingHeartHealthScreen;
