import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const DrugsScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.drugabuse.gov'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/drugs.jpeg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Drugs and Their Impact</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What Are Drugs?</Text>
        <Text style={styles.sectionText}>
          Drugs refer to any substance that, when ingested, alters the functioning of the body or mind. They can be natural or synthetic, legal or illegal, and are often used to treat medical conditions. However, when abused, drugs can have harmful effects on health and well-being.
        </Text>

        <Text style={styles.sectionTitle}>Types of Drugs</Text>
        <Text style={styles.sectionText}>
          Drugs can be classified into several categories based on their effects and usage. Here are some common types:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Prescription Drugs: Medications prescribed by a doctor to treat specific health conditions, such as painkillers and antibiotics.</Text>
          <Text style={styles.boxText}>- Over-the-Counter (OTC) Drugs: Medications available without a prescription, such as aspirin, antihistamines, and cold remedies.</Text>
          <Text style={styles.boxText}>- Recreational Drugs: Substances used for non-medical purposes, such as alcohol, marijuana, and tobacco.</Text>
          <Text style={styles.boxText}>- Illegal Drugs: Substances prohibited by law due to their potential for abuse and harm, such as cocaine, heroin, and methamphetamine.</Text>
        </View>

        <Text style={styles.sectionTitle}>The Impact of Drug Abuse</Text>
        <Text style={styles.sectionText}>
          Drug abuse can lead to severe physical, mental, and social consequences. Chronic drug use can result in:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Addiction: A compulsive need to use drugs, leading to physical and psychological dependence.</Text>
          <Text style={styles.boxText}>2. Health Problems: Long-term drug use can damage organs, impair cognitive function, and increase the risk of diseases such as cancer and heart disease.</Text>
          <Text style={styles.boxText}>3. Social Issues: Drug abuse often leads to problems with relationships, employment, and legal troubles.</Text>
        </View>

        <Text style={styles.sectionTitle}>Prevention and Treatment</Text>
        <Text style={styles.sectionText}>
          Effective drug abuse prevention and treatment are essential for reducing the impact of drugs on individuals and society. This includes:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Education: Raising awareness about the dangers of drug abuse and providing resources for making informed decisions.</Text>
          <Text style={styles.boxText}>- Counseling and Therapy: Helping individuals manage addiction through behavioral therapies, support groups, and counseling.</Text>
          <Text style={styles.boxText}>- Medication-Assisted Treatment: Using FDA-approved medications to reduce cravings and withdrawal symptoms in people with addiction.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for Drug Awareness</Text>
        <Text style={styles.sectionText}>
          For more information on drugs and their effects, visit:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [National Institute on Drug Abuse](https://www.drugabuse.gov)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Drugs and Addiction</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here to explore more about Drugs and Addiction.
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

export default DrugsScreen;
