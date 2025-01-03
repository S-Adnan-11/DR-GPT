// import React from 'react';
// import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

// const MentalHealthScreen = () => {
//   const handleLearnMore = () => {
//     Linking.openURL('https://www.mentalhealth.gov'); // Example external link
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header Section */}
//       <ImageBackground
//         source={require('../../../assets/LibraryPhotos/mental_health.jpg')} // Replace with appropriate image
//         style={styles.headerImage}
//       >
//         <Text style={styles.headerText}>Mental Health</Text>
//       </ImageBackground>

//       {/* Article Content */}
//       <View style={styles.articleContent}>
//         <Text style={styles.sectionTitle}>What is Mental Health?</Text>
//         <Text style={styles.sectionText}>
//           Mental health encompasses our emotional, psychological, and social well-being. It affects how we think, feel,
//           and behave. Mental health also influences how we handle stress, relate to others, and make choices. Mental health
//           is important at every stage of life, from childhood and adolescence through adulthood.
//         </Text>

//         <Text style={styles.sectionTitle}>Signs of Mental Health Issues</Text>
//         <Text style={styles.sectionText}>
//           Mental health problems can manifest in various ways. Common signs include:
//         </Text>
//         <View style={styles.textBox}>
//           <Text style={styles.boxText}>- Feeling sad or down for an extended period</Text>
//           <Text style={styles.boxText}>- Excessive worrying or fear</Text>
//           <Text style={styles.boxText}>- Extreme mood changes</Text>
//           <Text style={styles.boxText}>- Withdrawal from friends, family, and activities</Text>
//           <Text style={styles.boxText}>- Trouble thinking or concentrating</Text>
//         </View>

//         <Text style={styles.sectionTitle}>Mental Health and Stress</Text>
//         <Text style={styles.sectionText}>
//           Stress is a normal part of life, but chronic stress can negatively impact mental health. Learning how to
//           manage stress through relaxation techniques, physical activity, and social support can significantly improve
//           mental well-being.
//         </Text>

//         <Text style={styles.sectionTitle}>Ways to Improve Mental Health</Text>
//         <Text style={styles.sectionText}>
//           Here are some ways you can prioritize your mental health:
//         </Text>
//         <View style={styles.textBox}>
//           <Text style={styles.boxText}>- Get regular exercise</Text>
//           <Text style={styles.boxText}>- Practice mindfulness and meditation</Text>
//           <Text style={styles.boxText}>- Stay connected with loved ones</Text>
//           <Text style={styles.boxText}>- Seek professional help when needed</Text>
//           <Text style={styles.boxText}>- Engage in activities you enjoy</Text>
//         </View>

//         <Text style={styles.sectionText}>
//           Remember, it's okay to not feel okay sometimes. Taking the first step toward mental health support can make
//           a big difference. Seeking help is a sign of strength, not weakness.
//         </Text>
//       </View>

//       {/* External Resource Section */}
//       <View style={styles.externalResource}>
//         <Text style={styles.sectionTitle}>Learn More About Mental Health</Text>
//         <Text style={styles.externalLink} onPress={handleLearnMore}>
//           Click here to visit MentalHealth.gov for resources and support.
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   headerImage: {
//     width: '100%',
//     height: 250,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 50,
//     position: 'relative',
//   },
//   headerText: {
//     fontSize: 30,
//     color: 'white',
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.5)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 5,
//     textAlign: 'center',
//   },
//   articleContent: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2260FF',
//     marginBottom: 10,
//   },
//   sectionText: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#333',
//     marginBottom: 15,
//   },
//   textBox: {
//     backgroundColor: '#f0f8ff',
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   boxText: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 5,
//   },
//   externalResource: {
//     backgroundColor: '#e0f7fa',
//     padding: 15,
//     marginTop: 30,
//     borderRadius: 8,
//   },
//   externalLink: {
//     fontSize: 16,
//     color: '#00796b',
//     textDecorationLine: 'underline',
//     textAlign: 'center',
//   },
// });

// export default MentalHealthScreen;



import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const MentalHealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.mentalhealth.gov'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/mental_health.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Mental Health</Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What is Mental Health?</Text>
        <Text style={styles.sectionText}>
          Mental health refers to our emotional, psychological, and social well-being. It affects how we think, feel, and act. Good mental
          health is crucial for coping with life's challenges, maintaining relationships, and making informed decisions.
        </Text>

        <Text style={styles.sectionTitle}>Common Mental Health Disorders</Text>
        <Text style={styles.sectionText}>
          Mental health disorders are more common than many people realize. Some of the most prevalent conditions include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Anxiety Disorders: Includes generalized anxiety, panic attacks, and social anxiety.</Text>
          <Text style={styles.boxText}>- Depression: Persistent sadness and loss of interest in daily activities.</Text>
          <Text style={styles.boxText}>- Bipolar Disorder: Extreme mood swings between high energy (mania) and deep depression.</Text>
          <Text style={styles.boxText}>- PTSD (Post-Traumatic Stress Disorder): After experiencing trauma, leading to flashbacks and heightened anxiety.</Text>
          <Text style={styles.boxText}>- OCD (Obsessive-Compulsive Disorder): Recurrent, intrusive thoughts and compulsive behaviors.</Text>
        </View>

        <Text style={styles.sectionTitle}>Signs and Symptoms of Poor Mental Health</Text>
        <Text style={styles.sectionText}>
          It's important to recognize the signs of mental health struggles early on. Some common indicators include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Persistent feelings of sadness, hopelessness, or emptiness.</Text>
          <Text style={styles.boxText}>- Difficulty concentrating, making decisions, or remembering things.</Text>
          <Text style={styles.boxText}>- Withdrawal from friends, family, and activities.</Text>
          <Text style={styles.boxText}>- Extreme mood changes, irritability, or anger outbursts.</Text>
          <Text style={styles.boxText}>- Fatigue, sleep disturbances, or changes in appetite.</Text>
        </View>

        <Text style={styles.sectionTitle}>Coping Strategies for Mental Well-Being</Text>
        <Text style={styles.sectionText}>
          Developing healthy coping strategies is crucial for mental health. Some effective strategies include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Regular physical activity to release stress and improve mood.</Text>
          <Text style={styles.boxText}>2. Practicing mindfulness and meditation to increase self-awareness.</Text>
          <Text style={styles.boxText}>3. Talking to a therapist or counselor for professional support.</Text>
          <Text style={styles.boxText}>4. Building a strong social support system of family and friends.</Text>
          <Text style={styles.boxText}>5. Maintaining a balanced diet and healthy sleep habits.</Text>
        </View>

        <Text style={styles.sectionTitle}>The Role of Therapy in Mental Health</Text>
        <Text style={styles.sectionText}>
          Therapy is one of the most effective treatments for mental health disorders. Common therapy types include:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Cognitive Behavioral Therapy (CBT): Focuses on changing negative thought patterns.</Text>
          <Text style={styles.boxText}>- Dialectical Behavior Therapy (DBT): Helps individuals manage intense emotions and improve relationships.</Text>
          <Text style={styles.boxText}>- Psychodynamic Therapy: Focuses on understanding unconscious thoughts and early life experiences.</Text>
          <Text style={styles.boxText}>- Group Therapy: Involves sharing experiences with others in a supportive environment.</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Mental Health</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more resources from the U.S. Department of Health & Human Services.
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

export default MentalHealthScreen;
