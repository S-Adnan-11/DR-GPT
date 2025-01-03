import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const TeethOralHealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.ada.org/en/member-center/oral-health-topics'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/teeth2.jpeg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Teeth and Oral Health</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>The Importance of Oral Health</Text>
        <Text style={styles.sectionText}>
          Oral health is essential to overall well-being. Good oral hygiene practices can help prevent tooth decay, gum
          disease, and other oral health issues. A healthy mouth is vital for speaking, eating, and maintaining self-esteem.
          Additionally, poor oral health can lead to serious conditions such as heart disease, diabetes, and respiratory infections.
        </Text>

        <Text style={styles.sectionTitle}>Key Practices for Maintaining Oral Health</Text>
        <Text style={styles.sectionText}>
          Following a few simple practices can keep your teeth and gums healthy:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Brush your teeth twice a day with fluoride toothpaste.</Text>
          <Text style={styles.boxText}>2. Floss daily to remove plaque and food particles between teeth.</Text>
          <Text style={styles.boxText}>3. Eat a balanced diet and limit sugary snacks and drinks.</Text>
          <Text style={styles.boxText}>4. Visit your dentist regularly for check-ups and cleanings.</Text>
        </View>

        <Text style={styles.sectionTitle}>Common Oral Health Problems</Text>
        <Text style={styles.sectionText}>
          Some of the most common oral health issues include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Tooth decay (cavities)</Text>
          <Text style={styles.boxText}>- Gum disease (gingivitis, periodontitis)</Text>
          <Text style={styles.boxText}>- Tooth sensitivity</Text>
          <Text style={styles.boxText}>- Bad breath (halitosis)</Text>
        </View>

        <Text style={styles.sectionTitle}>How Oral Health Affects Your Overall Health</Text>
        <Text style={styles.sectionText}>
          Poor oral health can contribute to many serious health issues. For example, gum disease has been linked to
          increased risk of heart disease, stroke, and diabetes. Additionally, untreated tooth infections can lead to
          systemic infections that affect other parts of the body.
        </Text>

        <Text style={styles.sectionTitle}>Protecting Your Teeth from Damage</Text>
        <Text style={styles.sectionText}>
          Protect your teeth by avoiding harmful habits such as grinding your teeth, chewing on ice, or using your teeth
          as tools for opening bottles or packaging. Wearing a mouthguard during sports can also prevent injuries to the
          teeth and jaw.
        </Text>

        <Text style={styles.sectionTitle}>The Link Between Diet and Oral Health</Text>
        <Text style={styles.sectionText}>
          A healthy diet plays an important role in oral health. Calcium-rich foods, such as dairy products and leafy greens,
          help strengthen teeth. Vitamin C-rich foods, like citrus fruits, can help maintain healthy gums. Avoiding excessive
          sugar and processed foods is also crucial for preventing cavities and other oral health problems.
        </Text>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Oral Health</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more resources on oral health from the American Dental Association.
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

export default TeethOralHealthScreen;
