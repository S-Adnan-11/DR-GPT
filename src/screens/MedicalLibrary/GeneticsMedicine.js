import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const GeneticsMedicineScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.genomeweb.com'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/genetics.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Genetics Medicine and Advances</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What is Genetics Medicine?</Text>
        <Text style={styles.sectionText}>
          Genetics medicine is a rapidly advancing field that applies the principles of genetics to understand, diagnose, and treat diseases. By studying genes, researchers can develop therapies that target genetic disorders or improve overall health outcomes. The potential for genetics medicine to revolutionize healthcare is immense, offering more personalized, effective treatments.
        </Text>

        <Text style={styles.sectionTitle}>Applications of Genetics Medicine</Text>
        <Text style={styles.sectionText}>
          Genetics medicine has a wide range of applications in modern healthcare. Some of the most prominent include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Gene Therapy: A promising approach to treat or prevent diseases by altering the genetic material within a person's cells.</Text>
          <Text style={styles.boxText}>- Pharmacogenomics: The study of how genes affect a person's response to drugs, enabling personalized medication prescriptions.</Text>
          <Text style={styles.boxText}>- Genetic Testing: Screening for genetic mutations or inherited disorders, helping doctors make better diagnoses and treatment plans.</Text>
          <Text style={styles.boxText}>- Stem Cell Therapy: Using stem cells to regenerate damaged tissues or treat genetic conditions.</Text>
        </View>

        <Text style={styles.sectionTitle}>How Genetics Medicine Works</Text>
        <Text style={styles.sectionText}>
          Genetics medicine works by understanding the specific genes involved in diseases and then designing interventions to correct or replace the faulty genes. Techniques like CRISPR and gene editing allow scientists to modify genes at a molecular level, opening doors to the treatment of previously incurable genetic diseases.
        </Text>

        <Text style={styles.sectionTitle}>Current Research and Innovations</Text>
        <Text style={styles.sectionText}>
          Some of the current advancements in genetics medicine include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. CRISPR Technology: A revolutionary gene-editing tool that allows for precise changes in DNA.</Text>
          <Text style={styles.boxText}>2. Personalized Medicine: Customizing treatments based on an individual's genetic makeup for better outcomes.</Text>
          <Text style={styles.boxText}>3. Genetic Counseling: Helping individuals and families understand the risk of inherited conditions and the potential for genetic testing.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for Genetics Medicine</Text>
        <Text style={styles.sectionText}>
          For more information on genetics and its role in modern medicine, visit:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [GenomeWeb](https://www.genomeweb.com)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Genetics Medicine</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more insights into genetics medicine.
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

export default GeneticsMedicineScreen;
