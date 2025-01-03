import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const SexEmotionalHealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.psychologytoday.com/topics/emotional-health'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/sex_health.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Sexual and Emotional Health</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>Understanding Emotional Health</Text>
        <Text style={styles.sectionText}>
          Emotional health refers to the ability to manage and express emotions in a healthy way. It impacts how we cope
          with stress, relate to others, and make decisions. Good emotional health is crucial for building strong relationships
          and living a fulfilled life. It helps us manage challenges, cope with difficult emotions, and maintain balance in
          our lives.
        </Text>

        <Text style={styles.sectionTitle}>The Connection Between Sexual Health and Emotional Health</Text>
        <Text style={styles.sectionText}>
          Sexual health and emotional health are intricately connected. A fulfilling and healthy sexual life can boost emotional
          well-being, while emotional health plays a significant role in one’s sexual experience. People who feel good about
          themselves emotionally are more likely to have positive experiences in intimate relationships.
        </Text>

        <Text style={styles.sectionTitle}>How to Improve Emotional Health</Text>
        <Text style={styles.sectionText}>
          There are many ways to foster emotional health. Here are a few tips:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Practice mindfulness and meditation to stay present and calm.</Text>
          <Text style={styles.boxText}>2. Develop healthy communication skills with partners and loved ones.</Text>
          <Text style={styles.boxText}>3. Engage in regular physical activity to reduce stress and improve mood.</Text>
          <Text style={styles.boxText}>4. Seek professional help when facing overwhelming emotions.</Text>
          <Text style={styles.boxText}>5. Build a support network of friends and family for emotional stability.</Text>
        </View>

        <Text style={styles.sectionTitle}>Sexual Health Education</Text>
        <Text style={styles.sectionText}>
          Comprehensive sexual health education is key to understanding one’s body, desires, and boundaries. It provides the
          knowledge needed to make informed decisions about sexual activity, relationships, and personal boundaries. Being
          aware of sexual health topics also empowers individuals to take better care of their sexual well-being and
          communicate openly with partners.
        </Text>

        <Text style={styles.sectionTitle}>Emotions and Intimacy</Text>
        <Text style={styles.sectionText}>
          Emotional intimacy plays an important role in sexual health. Feeling emotionally safe and connected with a partner
          creates an environment where both individuals can express their desires, concerns, and needs openly. Good
          communication fosters trust and mutual respect, which are essential components of both emotional and sexual
          well-being.
        </Text>

        <Text style={styles.sectionTitle}>The Role of Stress in Sexual and Emotional Health</Text>
        <Text style={styles.sectionText}>
          Stress is one of the most significant barriers to both emotional and sexual health. Chronic stress can lead to
          emotional exhaustion, anxiety, and a diminished desire for intimacy. It’s essential to learn stress-reducing techniques
          such as deep breathing, exercise, and relaxation to maintain a healthy balance.
        </Text>

        <Text style={styles.sectionTitle}>Maintaining Healthy Boundaries</Text>
        <Text style={styles.sectionText}>
          Healthy emotional and sexual boundaries are essential in any relationship. These boundaries help individuals define
          their comfort levels, ensuring that both partners respect each other’s emotional and physical space. Communicating
          and setting boundaries ensures that both partners feel valued and safe in their emotional and sexual interactions.
        </Text>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Emotional and Sexual Health</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here to read more about emotional health on Psychology Today.
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

export default SexEmotionalHealthScreen;


