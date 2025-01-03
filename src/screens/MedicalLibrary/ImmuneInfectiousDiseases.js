import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const ImmuneInfectiousDiseasesScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.cdc.gov/infectiousdiseases'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/immune_system2.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Immune System and Infectious Diseases</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What are Infectious Diseases?</Text>
        <Text style={styles.sectionText}>
          Infectious diseases are caused by microorganisms such as bacteria, viruses, fungi, or parasites. These diseases can spread from person to person, animal to person, or through environmental sources. Common infectious diseases include the flu, tuberculosis, and COVID-19. The immune system plays a crucial role in defending the body against these harmful pathogens.
        </Text>

        <Text style={styles.sectionTitle}>How the Immune System Works</Text>
        <Text style={styles.sectionText}>
          The immune system is the body's defense mechanism against infections. It is composed of cells, tissues, and organs that work together to identify and eliminate foreign invaders. Key components of the immune system include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- White Blood Cells: These cells are responsible for recognizing and attacking pathogens.</Text>
          <Text style={styles.boxText}>- Antibodies: Proteins that target and neutralize specific pathogens.</Text>
          <Text style={styles.boxText}>- Lymphatic System: A network of tissues and organs that help the body fight infection.</Text>
          <Text style={styles.boxText}>- Skin and Mucous Membranes: The first line of defense against pathogens.</Text>
        </View>

        <Text style={styles.sectionTitle}>Common Infectious Diseases</Text>
        <Text style={styles.sectionText}>
          Some of the most common infectious diseases include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Influenza (Flu): A contagious viral infection that affects the respiratory system.</Text>
          <Text style={styles.boxText}>2. Tuberculosis (TB): A bacterial infection that primarily affects the lungs.</Text>
          <Text style={styles.boxText}>3. COVID-19: A viral disease caused by the SARS-CoV-2 virus, leading to respiratory illness.</Text>
          <Text style={styles.boxText}>4. HIV/AIDS: A viral infection that attacks the immune system, weakening the body's defenses against other infections.</Text>
          <Text style={styles.boxText}>5. Malaria: A parasitic infection transmitted by mosquitoes, primarily affecting tropical regions.</Text>
        </View>

        <Text style={styles.sectionTitle}>Prevention and Treatment of Infectious Diseases</Text>
        <Text style={styles.sectionText}>
          Preventing and treating infectious diseases involves a combination of strategies, such as:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Vaccination: A preventive measure to help protect individuals from specific infections, such as flu or measles.</Text>
          <Text style={styles.boxText}>2. Proper Hygiene: Handwashing and maintaining cleanliness to prevent the spread of germs.</Text>
          <Text style={styles.boxText}>3. Antibiotics and Antivirals: Medications used to treat bacterial and viral infections, respectively.</Text>
          <Text style={styles.boxText}>4. Quarantine and Isolation: Measures to prevent the spread of contagious diseases.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources on Infectious Diseases</Text>
        <Text style={styles.sectionText}>
          For more information on infectious diseases and how to protect yourself, visit:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [CDC Infectious Diseases](https://www.cdc.gov/infectiousdiseases)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Infectious Diseases</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for additional information on infectious diseases and prevention.
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

export default ImmuneInfectiousDiseasesScreen;
