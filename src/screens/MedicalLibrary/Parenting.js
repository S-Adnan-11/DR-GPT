import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const ParentingScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.parenting.com'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/child_health.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Parenting</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>The Importance of Parenting</Text>
        <Text style={styles.sectionText}>
          Parenting is one of the most impactful aspects of a child's life. It involves providing love, support, and guidance to help
          children grow into emotionally healthy and successful individuals. Parenting styles vary across cultures, families, and
          generations, but the goal remains the same: to raise children who are capable, compassionate, and well-adjusted.
        </Text>

        <Text style={styles.sectionTitle}>Parenting Styles</Text>
        <Text style={styles.sectionText}>
          There are several recognized parenting styles, each with its strengths and challenges:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Authoritative: Combines warmth and structure, with high expectations and open communication.</Text>
          <Text style={styles.boxText}>2. Authoritarian: Focuses on strict rules and obedience, with little flexibility or emotional warmth.</Text>
          <Text style={styles.boxText}>3. Permissive: Characterized by a high level of warmth and low expectations, with few rules or boundaries.</Text>
          <Text style={styles.boxText}>4. Uninvolved: Lacks emotional involvement and may be indifferent or neglectful.</Text>
        </View>

        <Text style={styles.sectionTitle}>Effective Parenting Tips</Text>
        <Text style={styles.sectionText}>
          Parenting requires patience, consistency, and love. Here are some tips for effective parenting:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Set Clear Boundaries: Establish rules that promote respect, responsibility, and healthy behaviors.</Text>
          <Text style={styles.boxText}>2. Practice Positive Reinforcement: Reward desirable behavior with praise and encouragement.</Text>
          <Text style={styles.boxText}>3. Spend Quality Time: Engage in activities with your children that foster bonding and open communication.</Text>
          <Text style={styles.boxText}>4. Model Good Behavior: Demonstrate the values, attitudes, and behaviors you want your children to adopt.</Text>
          <Text style={styles.boxText}>5. Show Unconditional Love: Offer emotional support and understanding, no matter what challenges arise.</Text>
        </View>

        <Text style={styles.sectionTitle}>Parenting During Different Stages</Text>
        <Text style={styles.sectionText}>
          Parenting approaches will vary depending on the child's age and development stage:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Infancy: Focus on nurturing, feeding, and creating a secure attachment.</Text>
          <Text style={styles.boxText}>- Toddlerhood: Set boundaries, teach basic skills, and encourage independence.</Text>
          <Text style={styles.boxText}>- School Age: Promote social development, academic learning, and emotional regulation.</Text>
          <Text style={styles.boxText}>- Adolescence: Offer guidance on decision-making, while allowing greater independence.</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for Parenting</Text>
        <Text style={styles.sectionText}>
          For more information on parenting, consider visiting the following resources:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [Parenting.com](https://www.parenting.com) (Articles, advice, and tips for all parenting stages)</Text>
          <Text style={styles.boxText}>- [Zero to Three](https://www.zerotothree.org) (Developmental milestones and tips for parenting young children)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Parenting</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more resources on Parenting from Parenting.com.
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

export default ParentingScreen;
