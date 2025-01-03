import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const AlternativeMedicineScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/natural_medicine.jpg')}
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Alternative Medicine</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What is Alternative Medicine?</Text>
        <Text style={styles.sectionText}>
          Alternative medicine refers to treatments that are not part of conventional medical care. These include practices
          such as acupuncture, herbal remedies, and meditation, which have been used for centuries in various cultures.
        </Text>

        <Text style={styles.sectionTitle}>Popular Types of Alternative Medicine</Text>
        <Text style={styles.sectionText}>
          Some of the most widely used types include:
        </Text>
        <Text style={styles.listItem}>1. Acupuncture</Text>
        <Text style={styles.listItem}>2. Homeopathy</Text>
        <Text style={styles.listItem}>3. Chiropractic care</Text>
        <Text style={styles.listItem}>4. Herbal medicine</Text>
        <Text style={styles.listItem}>5. Meditation and mindfulness</Text>

        <Text style={styles.sectionTitle}>Benefits of Alternative Medicine</Text>
        <Text style={styles.sectionText}>
          Many people turn to alternative medicine for its perceived ability to treat the root cause of illness, reduce
          side effects of medications, and promote overall wellness.
        </Text>

        <Text style={styles.sectionTitle}>Considerations</Text>
        <Text style={styles.sectionText}>
          While alternative medicine can be effective, it is important to seek guidance from a healthcare provider and
          ensure that any treatment used is safe and compatible with other therapies.
        </Text>
      </View>

      {/* Suggested Resources */}
      <Text style={styles.sectionTitle}>Suggested Resources</Text>
      <View style={styles.cardsContainer}>
        <Card style={styles.card}>
          <Card.Cover source={require('../../../assets/LibraryPhotos/natural_medicine.jpg')} />
          <Card.Content>
            <Title>Herbal Remedies</Title>
            <Paragraph>Learn about the healing properties of various herbs used in alternative medicine.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Learn More</Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Cover source={require('../../../assets/LibraryPhotos/natural_medicine.jpg')} />
          <Card.Content>
            <Title>Acupuncture</Title>
            <Paragraph>Discover how acupuncture is used to treat pain and promote health.</Paragraph>
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

export default AlternativeMedicineScreen;
