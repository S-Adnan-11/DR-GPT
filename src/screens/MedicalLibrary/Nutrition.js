import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const NutritionScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.nutrition.gov'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/nutrition1.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Nutrition</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>Understanding Nutrition</Text>
        <Text style={styles.sectionText}>
          Nutrition plays a crucial role in maintaining good health. The food we eat provides our bodies with the necessary nutrients
          to function properly. A balanced diet can help prevent chronic diseases, manage weight, and improve energy levels.
        </Text>

        <Text style={styles.sectionTitle}>Key Nutrients and Their Roles</Text>
        <Text style={styles.sectionText}>
          There are several key nutrients that our body requires, each with specific functions to support overall health:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Carbohydrates: The body's primary source of energy, found in foods like grains, fruits, and vegetables.</Text>
          <Text style={styles.boxText}>2. Proteins: Essential for tissue repair, muscle growth, and immune function. Found in meat, beans, nuts, and dairy.</Text>
          <Text style={styles.boxText}>3. Fats: Necessary for brain function, cell structure, and vitamin absorption. Sources include nuts, seeds, and healthy oils.</Text>
          <Text style={styles.boxText}>4. Vitamins: Crucial for various bodily functions, including immune health and bone maintenance. Found in fruits, vegetables, and dairy.</Text>
          <Text style={styles.boxText}>5. Minerals: Support bone health, nerve function, and oxygen transport. Examples include calcium, iron, and magnesium.</Text>
        </View>

        <Text style={styles.sectionTitle}>Building a Balanced Diet</Text>
        <Text style={styles.sectionText}>
          A balanced diet includes a variety of foods from all food groups. The following tips can help you build a healthy and
          well-rounded diet:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Fill Half Your Plate with Fruits and Vegetables: Aim for a colorful variety to get a range of nutrients.</Text>
          <Text style={styles.boxText}>2. Include Whole Grains: Choose whole grain options like brown rice, oats, and quinoa instead of refined grains.</Text>
          <Text style={styles.boxText}>3. Incorporate Lean Proteins: Include sources like fish, chicken, legumes, and tofu.</Text>
          <Text style={styles.boxText}>4. Limit Added Sugars and Processed Foods: Minimize intake of sugary beverages and snacks that provide little nutritional value.</Text>
          <Text style={styles.boxText}>5. Stay Hydrated: Drink plenty of water throughout the day to support overall health.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for Nutrition</Text>
        <Text style={styles.sectionText}>
          For more information on nutrition and healthy eating, explore these trusted resources:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [Nutrition.gov](https://www.nutrition.gov) (Comprehensive nutrition resources and tips)</Text>
          <Text style={styles.boxText}>- [American Heart Association - Healthy Eating](https://www.heart.org/en/healthy-living/healthy-eating) (Guidelines for heart-healthy nutrition)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Nutrition</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more resources on Nutrition from the U.S. Department of Agriculture.
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

export default NutritionScreen;
