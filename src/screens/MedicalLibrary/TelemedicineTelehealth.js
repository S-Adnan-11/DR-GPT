// import React from 'react';
// import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

// const TelemedicineTelehealthScreen = () => {
//   const handleLearnMore = () => {
//     Linking.openURL('https://www.telemedicine.org'); // Example external link
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header Section */}
//       <ImageBackground
//         source={require('../../../assets/LibraryPhotos/tele_med_health.jpg')} // Replace with appropriate image
//         style={styles.headerImage}
//       >
//         <Text style={styles.headerText}></Text>
//       </ImageBackground>

//       {/* Article Content */}
//       <View style={styles.articleContent}>
//         <Text style={styles.sectionTitle}>What is Telemedicine?</Text>
//         <Text style={styles.sectionText}>
//           Telemedicine refers to the practice of providing medical care remotely using telecommunications technology. It allows
//           patients to consult with healthcare providers without needing to visit a clinic or hospital in person.
//         </Text>

//         <Text style={styles.sectionTitle}>Benefits of Telemedicine</Text>
//         <Text style={styles.sectionText}>
//           Telemedicine offers several benefits, making healthcare more accessible and convenient:
//         </Text>
//         <View style={styles.textBox}>
//           <Text style={styles.boxText}>1. Convenience: Access healthcare services from the comfort of your home.</Text>
//           <Text style={styles.boxText}>2. Cost-effective: Reduces the cost of travel and time off work.</Text>
//           <Text style={styles.boxText}>3. Accessibility: Provides healthcare access to those in remote or underserved areas.</Text>
//           <Text style={styles.boxText}>4. Faster Consultations: Speak to a doctor quickly without waiting in line.</Text>
//         </View>

//         <Text style={styles.sectionTitle}>Telehealth Services Available</Text>
//         <Text style={styles.sectionText}>
//           Telemedicine is used for a wide range of healthcare services, including:
//         </Text>
//         <View style={styles.textBox}>
//           <Text style={styles.boxText}>- Virtual Doctor Visits: Consultations with physicians via video or phone.</Text>
//           <Text style={styles.boxText}>- Mental Health Counseling: Therapy sessions with licensed counselors online.</Text>
//           <Text style={styles.boxText}>- Remote Monitoring: Patients can track vital signs such as blood pressure or glucose levels from home.</Text>
//           <Text style={styles.boxText}>- Second Opinions: Get expert opinions from specialists remotely.</Text>
//         </View>

//         <Text style={styles.sectionTitle}>How to Use Telemedicine</Text>
//         <Text style={styles.sectionText}>
//           Getting started with telemedicine is simple. Here are some steps:
//         </Text>
//         <View style={styles.textBox}>
//           <Text style={styles.boxText}>1. Choose a Telemedicine Platform: Select a trusted telemedicine provider or healthcare provider offering virtual consultations.</Text>
//           <Text style={styles.boxText}>2. Schedule an Appointment: Book a consultation with a healthcare professional through the platform.</Text>
//           <Text style={styles.boxText}>3. Prepare for Your Appointment: Make sure you have a reliable internet connection and the necessary equipment (e.g., webcam, microphone).</Text>
//         </View>

//         <Text style={styles.sectionTitle}>External Resources for Telemedicine</Text>
//         <Text style={styles.sectionText}>
//           For more information on telemedicine and telehealth services, visit the following trusted resources:
//         </Text>
//         <View style={styles.textBox}>
//           <Text style={styles.boxText}>- [Telemedicine.org](https://www.telemedicine.org) (A comprehensive guide to telemedicine and its benefits)</Text>
//           <Text style={styles.boxText}>- [American Telemedicine Association](https://www.americantelemed.org) (Resources, research, and advocacy for telehealth)</Text>
//         </View>
//       </View>

//       {/* External Resource Section */}
//       <View style={styles.externalResource}>
//         <Text style={styles.sectionTitle}>Learn More About Telemedicine</Text>
//         <Text style={styles.externalLink} onPress={handleLearnMore}>
//           Click here for more resources on Telemedicine and Telehealth from Telemedicine.org.
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

// export default TelemedicineTelehealthScreen;


import React from 'react';
import { ScrollView, Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';

const TelemedicineTelehealthScreen = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://www.telemedicine.org'); // Example external link
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/LibraryPhotos/tele_med_health.jpg')} // Replace with appropriate image
        style={styles.headerImage}
      >
        <Text style={styles.headerText}></Text>
      </ImageBackground>

      {/* Article Content */}
      <View style={styles.articleContent}>
        <Text style={styles.sectionTitle}>What is Telemedicine?</Text>
        <Text style={styles.sectionText}>
          Telemedicine refers to the practice of providing medical care remotely using telecommunications technology. It allows
          patients to consult with healthcare providers without needing to visit a clinic or hospital in person.
        </Text>

        <Text style={styles.sectionTitle}>What is Telehealth?</Text>
        <Text style={styles.sectionText}>
          Telehealth is a broader term that includes telemedicine but also encompasses a wide variety of health-related services
          delivered remotely. This can include telemedicine (remote clinical services), but also includes health education,
          remote monitoring, online therapy, and administrative services.
        </Text>

        <Text style={styles.sectionTitle}>Telemedicine vs Telehealth</Text>
        <Text style={styles.sectionText}>
          While both telemedicine and telehealth are terms used to describe remote healthcare, there are differences:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>
            - Telemedicine: Remote clinical services such as virtual doctor visits, diagnosis, and treatment.
          </Text>
          <Text style={styles.boxText}>
            - Telehealth: A broader scope that includes telemedicine, plus services like health education, remote patient monitoring, and online wellness coaching.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Benefits of Telemedicine & Telehealth</Text>
        <Text style={styles.sectionText}>
          Both telemedicine and telehealth offer several benefits, making healthcare more accessible and convenient:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Convenience: Access healthcare services from the comfort of your home.</Text>
          <Text style={styles.boxText}>2. Cost-effective: Reduces the cost of travel and time off work.</Text>
          <Text style={styles.boxText}>3. Accessibility: Provides healthcare access to those in remote or underserved areas.</Text>
          <Text style={styles.boxText}>4. Faster Consultations: Speak to a doctor or specialist quickly without waiting in line.</Text>
        </View>

        <Text style={styles.sectionTitle}>Telemedicine Services Available</Text>
        <Text style={styles.sectionText}>
          Telemedicine is used for a wide range of healthcare services, including:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Virtual Doctor Visits: Consultations with physicians via video or phone.</Text>
          <Text style={styles.boxText}>- Mental Health Counseling: Therapy sessions with licensed counselors online.</Text>
          <Text style={styles.boxText}>- Remote Monitoring: Patients can track vital signs such as blood pressure or glucose levels from home.</Text>
          <Text style={styles.boxText}>- Second Opinions: Get expert opinions from specialists remotely.</Text>
        </View>

        <Text style={styles.sectionTitle}>Telehealth Services Available</Text>
        <Text style={styles.sectionText}>
          Telehealth expands beyond medical care to include the following services:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- Health Education: Remote wellness and health education programs.</Text>
          <Text style={styles.boxText}>- Online Health Coaching: Personalized health coaching services for managing lifestyle changes or chronic conditions.</Text>
          <Text style={styles.boxText}>- Tele-Rehabilitation: Physical or occupational therapy services provided remotely.</Text>
          <Text style={styles.boxText}>- Administrative Services: Remote scheduling, consultations, or billing management.</Text>
        </View>

        <Text style={styles.sectionTitle}>How to Use Telemedicine & Telehealth</Text>
        <Text style={styles.sectionText}>
          Getting started with telemedicine and telehealth is simple. Here are some steps:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>1. Choose a Telemedicine or Telehealth Platform: Select a trusted provider offering the services you need.</Text>
          <Text style={styles.boxText}>2. Schedule an Appointment: Book a consultation with a healthcare professional or health coach through the platform.</Text>
          <Text style={styles.boxText}>3. Prepare for Your Appointment: Make sure you have a reliable internet connection and the necessary equipment (e.g., webcam, microphone).</Text>
        </View>

        <Text style={styles.sectionTitle}>External Resources for Telemedicine & Telehealth</Text>
        <Text style={styles.sectionText}>
          For more information on telemedicine and telehealth services, visit the following trusted resources:
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>- [Telemedicine.org](https://www.telemedicine.org) (A comprehensive guide to telemedicine and its benefits)</Text>
          <Text style={styles.boxText}>- [American Telemedicine Association](https://www.americantelemed.org) (Resources, research, and advocacy for telehealth)</Text>
          <Text style={styles.boxText}>- [Telehealth Resource Centers](https://www.telehealthresourcecenter.org) (Support and resources for telehealth implementation)</Text>
        </View>
      </View>

      {/* External Resource Section */}
      <View style={styles.externalResource}>
        <Text style={styles.sectionTitle}>Learn More About Telemedicine & Telehealth</Text>
        <Text style={styles.externalLink} onPress={handleLearnMore}>
          Click here for more resources on Telemedicine and Telehealth from Telemedicine.org.
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

export default TelemedicineTelehealthScreen;
