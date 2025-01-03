import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const FitnessScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.fitness.gov'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/fitness5.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Fitness and Wellness</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What is Fitness?</Text>
        <Text style={styles.sectionText}>
          Fitness refers to the state of being physically healthy and active. It is achieved through regular physical activity, proper nutrition, and adequate rest. Fitness is essential for maintaining a healthy lifestyle and improving overall well-being.
        </Text>

        <Text style={styles.sectionTitle}>The Benefits of Fitness</Text>
        <Text style={styles.sectionText}>
          Regular exercise and physical activity offer numerous health benefits. These include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Improved Cardiovascular Health: Regular exercise strengthens the heart and improves circulation.</Text>
          <Text style={styles.boxText}>- Weight Management: Exercise helps burn calories and regulate body weight.</Text>
          <Text style={styles.boxText}>- Enhanced Mental Health: Physical activity can reduce stress, anxiety, and symptoms of depression.</Text>
          <Text style={styles.boxText}>- Increased Strength and Flexibility: Exercise builds muscle and increases flexibility, leading to better mobility and reduced injury risk.</Text>
          <Text style={styles.boxText}>- Better Sleep: Regular activity can help improve the quality of your sleep.</Text>
        </View>

        <Text style={styles.sectionTitle}>Types of Fitness Exercises</Text>
        <Text style={styles.sectionText}>
          There are several types of exercises you can do to improve your fitness. These include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Aerobic Exercise: Activities such as running, swimming, or cycling that increase heart rate and improve cardiovascular health.</Text>
          <Text style={styles.boxText}>2. Strength Training: Weightlifting or bodyweight exercises that build muscle strength and endurance.</Text>
          <Text style={styles.boxText}>3. Flexibility Training: Activities like yoga or Pilates that improve flexibility and range of motion.</Text>
          <Text style={styles.boxText}>4. Balance Exercises: Activities like Tai Chi that enhance stability and prevent falls.</Text>
        </View>

        <Text style={styles.sectionTitle}>How to Stay Fit</Text>
        <Text style={styles.sectionText}>
          Staying fit requires consistency and dedication. Here are some tips to help you stay on track:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Set achievable fitness goals to track your progress and stay motivated.</Text>
          <Text style={styles.boxText}>- Incorporate a mix of exercises to keep your routine interesting and challenging.</Text>
          <Text style={styles.boxText}>- Prioritize rest and recovery to allow your body to heal and rebuild stronger muscles.</Text>
          <Text style={styles.boxText}>- Stay hydrated and maintain a balanced diet to fuel your workouts and improve performance.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for Fitness</Text>
        <Text style={styles.sectionText}>
          For more information on fitness and exercise, visit:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [Health.gov - Physical Activity Guidelines](https://www.fitness.gov)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Fitness</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more fitness resources.
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

export default FitnessScreen;
