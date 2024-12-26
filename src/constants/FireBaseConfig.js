import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.measurementId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};


// Initialize Firebase app
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const firestore = getFirestore(app); // Initialize Firestore

// Initialize Firebase Authentication with persistence
const auth = getAuth(app);
auth.setPersistence(getReactNativePersistence(AsyncStorage));


const db = getFirestore(app);

// Export everything
export { 
  auth, 
  GoogleAuthProvider, 
  signInWithCredential, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  firestore,
  onAuthStateChanged,
  db,
  app
};
