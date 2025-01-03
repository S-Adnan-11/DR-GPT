import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const SleepHealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.sleepfoundation.org'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/sleep.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Sleep Health</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>Why Sleep Is Vital for Health</Text>
        <Text style={styles.sectionText}>
          Sleep is essential for both physical and mental well-being. It plays a vital role in maintaining cognitive function, mood,
          immune health, and physical performance. Chronic sleep deprivation can lead to various health problems such as increased
          risk for heart disease, diabetes, and mental health disorders.
        </Text>

        <Text style={styles.sectionTitle}>The Stages of Sleep</Text>
        <Text style={styles.sectionText}>
          Sleep occurs in cycles, each consisting of multiple stages. Understanding these stages is important for maintaining good sleep hygiene:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. NREM (Non-Rapid Eye Movement) Sleep: Comprising three stages, this is the restorative phase of sleep where the body repairs and regenerates.</Text>
          <Text style={styles.boxText}>2. REM (Rapid Eye Movement) Sleep: This stage is when most dreaming occurs, and it plays a crucial role in memory consolidation and learning.</Text>
          <Text style={styles.boxText}>3. Deep Sleep: A part of NREM sleep, deep sleep is crucial for physical recovery and immune system strengthening.</Text>
        </View>

        <Text style={styles.sectionTitle}>Common Sleep Disorders</Text>
        <Text style={styles.sectionText}>
          Several sleep disorders can affect your ability to sleep well. Some of the most common include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Insomnia: Difficulty falling or staying asleep.</Text>
          <Text style={styles.boxText}>- Sleep Apnea: Interrupted breathing during sleep, often leading to snoring and fatigue.</Text>
          <Text style={styles.boxText}>- Restless Leg Syndrome: Uncontrollable urges to move the legs, often disrupting sleep.</Text>
          <Text style={styles.boxText}>- Narcolepsy: Excessive daytime sleepiness and sudden, uncontrollable sleep attacks.</Text>
        </View>

        <Text style={styles.sectionTitle}>Tips for Better Sleep</Text>
        <Text style={styles.sectionText}>
          Here are some tips to improve the quality of your sleep:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Stick to a consistent sleep schedule, even on weekends.</Text>
          <Text style={styles.boxText}>2. Create a relaxing bedtime routine, such as reading or taking a warm bath.</Text>
          <Text style={styles.boxText}>3. Avoid caffeine, nicotine, and heavy meals close to bedtime.</Text>
          <Text style={styles.boxText}>4. Create a sleep-friendly environment—dark, quiet, and cool.</Text>
          <Text style={styles.boxText}>5. Limit screen time (phone, TV, etc.) at least an hour before bed.</Text>
        </View>

        <Text style={styles.sectionTitle}>The Impact of Sleep on Mental Health</Text>
        <Text style={styles.sectionText}>
          Sleep and mental health are closely connected. Lack of sleep can contribute to mental health disorders like anxiety, depression,
          and mood swings. Inadequate sleep can make it harder to regulate emotions and cope with stress.
        </Text>

        <Text style={styles.sectionTitle}>The Link Between Sleep and Physical Health</Text>
        <Text style={styles.sectionText}>
          Sleep impacts many aspects of physical health. Chronic sleep deprivation can increase the risk of:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Heart disease and high blood pressure.</Text>
          <Text style={styles.boxText}>- Diabetes and obesity.</Text>
          <Text style={styles.boxText}>- Weakened immune system and increased susceptibility to infections.</Text>
          <Text style={styles.boxText}>- Impaired cognitive function and memory loss.</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Sleep Health</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more resources on sleep health from the Sleep Foundation.
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

export default SleepHealthScreen;
