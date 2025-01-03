import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const EnvironmentalHealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.epa.gov/environmental-health'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/enviroment_health.webp')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Environmental Health</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What Is Environmental Health?</Text>
        <Text style={styles.sectionText}>
          Environmental health refers to the branch of public health that focuses on the relationship between people and their
          environment, particularly the impacts of environmental factors on human health. It encompasses the prevention and control
          of environmental hazards such as air pollution, water contamination, and hazardous waste.
        </Text>

        <Text style={styles.sectionTitle}>Key Environmental Health Issues</Text>
        <Text style={styles.sectionText}>
          There are several pressing environmental health issues that require attention:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Air Pollution: Harmful emissions from vehicles, factories, and other sources can cause respiratory diseases and cardiovascular issues.</Text>
          <Text style={styles.boxText}>- Water Pollution: Contaminants in water sources, such as lead and pesticides, can lead to serious health problems like gastrointestinal issues and neurological disorders.</Text>
          <Text style={styles.boxText}>- Climate Change: Changes in weather patterns, rising temperatures, and extreme weather events can contribute to heat-related illnesses, respiratory issues, and the spread of infectious diseases.</Text>
          <Text style={styles.boxText}>- Hazardous Waste: Improper disposal of chemicals and waste materials can contaminate soil, water, and air, leading to long-term health risks.</Text>
        </View>

        <Text style={styles.sectionTitle}>Protecting Health from Environmental Hazards</Text>
        <Text style={styles.sectionText}>
          There are various strategies for minimizing the impact of environmental hazards on health:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Air Quality Monitoring: Keeping track of air pollution levels and implementing policies to reduce emissions from vehicles and industrial processes.</Text>
          <Text style={styles.boxText}>2. Water Treatment: Ensuring access to clean drinking water by filtering contaminants and preventing pollution in water sources.</Text>
          <Text style={styles.boxText}>3. Waste Management: Proper disposal of hazardous materials to prevent contamination of the environment and protect public health.</Text>
          <Text style={styles.boxText}>4. Green Spaces: Promoting urban green spaces to reduce pollution, enhance mental health, and improve overall well-being.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for Environmental Health</Text>
        <Text style={styles.sectionText}>
          For more information on environmental health and its importance, visit:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [Environmental Protection Agency: Environmental Health](https://www.epa.gov/environmental-health)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Environmental Health</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more resources on Environmental Health.
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

export default EnvironmentalHealthScreen;
