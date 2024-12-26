import React, {useEffect} from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Animated } from "react-native"

const WelcomeScreen = ({navigation}) => {

  const fadeAnim = new Animated.Value(0);

   useEffect(() => {
     Animated.timing(fadeAnim, {
       toValue: 1, 
       duration: 2000,  //Animation duration in milliseconds
       useNativeDriver: true,
     }).start();

      //Navigate to HomeScreen after animation ends
     const timer = setTimeout(() => {
       navigation.replace('AuthScreen');  //Use replace to prevent going back to WelcomeScreen
     }, 2000);  //Match duration of animation

     return () => clearTimeout(timer);  //Cleanup timer on unmount
   }, [fadeAnim, navigation]);

   return (
    <View style={styles.WelcomeScreen}>
      <View style={styles.Group808}>
        <Image
          style={styles.Logo}
          source={require('../../assets/logo.png')}
        />
        
      </View>
      <Text style={styles.AppName}>Mobile Health Care App...◌</Text>
        <Text style={styles.BottomText}>
          A Health Advice Application
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  WelcomeScreen: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
    paddingLeft: 55,
    paddingRight: 55,
    paddingTop: 150,
    paddingBottom: 100,
    //borderRadius: 30,
    boxSizing: "border-box",
    backgroundColor: "rgba(34,96,255,1)",
  },
  Group808: {
    display: "flex",
    flex: 1,
    //flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    marginTop: 100,
    marginBottom: 10,
 },
  Logo: {
    width: 170,
    height: 170,
    marginTop: 50,
    marginBottom: 5,
  },
  AppName: {
    display: "flex",
    //flexDirection: "column",
    justifyContent: "center",
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    lineHeight: 30,
    fontFamily: "sans-serif",
    fontWeight: 'bold',
    textAlign: "center",
    textTransform: "capitalize",
    marginBottom: 50,
    marginTop: 10,
  },
  BottomText: {
    display: "flex",
    //flexDirection: "column",
    justifyContent: "center",
    color: "rgba(255,255,255,1)",
    fontSize: 12,
    lineHeight: 12,
    fontFamily: "sans-serif",
    fontWeight: 'bold',
    textAlign: "center",
    textTransform: "capitalize",
    marginBottom: 10,
    marginTop: 100,
  },
})

export default WelcomeScreen;
