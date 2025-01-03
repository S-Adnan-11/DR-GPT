import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const AddictionRecoveryScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/addiction.webp')} // Add relevant image here
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Addiction Recovery</Text>
      </ImageBackground>

      {/* Article Introduction */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What is Addiction?</Text>
        <Text style={styles.sectionText}>
          Addiction is a chronic condition characterized by the compulsive use of substances or engagement in behaviors,
          despite negative consequences. It can affect anyone, and overcoming it requires strength, support, and dedication.
        </Text>

        <Text style={styles.sectionTitle}>Types of Addiction</Text>
        <Text style={styles.sectionText}>
          Addiction can come in many forms. The most common types include:
        </Text>
        <Text style={styles.listItem}>1. Alcohol Addiction</Text>
        <Text style={styles.listItem}>2. Drug Addiction</Text>
        <Text style={styles.listItem}>3. Gambling Addiction</Text>
        <Text style={styles.listItem}>4. Food Addiction</Text>
        <Text style={styles.listItem}>5. Internet Addiction</Text>

        <Text style={styles.sectionTitle}>Signs of Addiction</Text>
        <Text style={styles.sectionText}>
          Recognizing the signs of addiction is crucial in early intervention. Some common signs include:
        </Text>
        <Text style={styles.listItem}>- Loss of control over the behavior</Text>
        <Text style={styles.listItem}>- Increased tolerance or need for higher amounts</Text>
        <Text style={styles.listItem}>- Withdrawal symptoms when trying to stop</Text>
        <Text style={styles.listItem}>- Neglecting responsibilities or relationships</Text>

        <Text style={styles.sectionTitle}>Treatment and Recovery</Text>
        <Text style={styles.sectionText}>
          The path to recovery from addiction is different for everyone. Treatment may involve therapy, counseling, medication,
          or support groups. Here are some common approaches:
        </Text>
        <Text style={styles.listItem}>- Cognitive Behavioral Therapy (CBT)</Text>
        <Text style={styles.listItem}>- Medication-Assisted Treatment (MAT)</Text>
        <Text style={styles.listItem}>- Support Groups (e.g., AA, NA)</Text>

        <Text style={styles.sectionTitle}>Staying Committed to Recovery</Text>
        <Text style={styles.sectionText}>
          Recovery is an ongoing journey, and staying committed to the process is key. Support systems, healthy habits, and
          self-compassion are all important factors in sustaining long-term recovery.
        </Text>

        <Text style={styles.sectionText}>
          It’s important to seek professional help if you or someone you know is struggling with addiction. Recovery is
          possible, and there’s no shame in asking for help.
        </Text>
      </View>

      {/* Suggested Resources */}
      <Text style={styles.sectionTitle}>Suggested Resources</Text>
      <View style={styles.cardsContainer}>
        <Card style={styles.card}>
          <Card.Cover source={require('../../../assets/LibraryPhotos/addiction.webp')} />
          <Card.Content>
            <Title>Recovery Tips</Title>
            <Paragraph>Explore practical advice for overcoming addiction and maintaining sobriety.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Read More</Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Cover source={require('../../../assets/LibraryPhotos/addiction.webp')} />
          <Card.Content>
            <Title>Cognitive Behavioral Therapy (CBT)</Title>
            <Paragraph>Learn how CBT is used in addiction treatment to change unhealthy behaviors.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Explore</Button>
          </Card.Actions>
        </Card>
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
  listItem: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    marginBottom: 5,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  card: {
    width: 300,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default AddictionRecoveryScreen;
