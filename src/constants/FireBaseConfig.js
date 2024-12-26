import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQqMtPyQtXm8dfuJQKK2ITjtjj_Ui1MkE",
  authDomain: "drgpt-ad363.firebaseapp.com",
  databaseURL: "https://drgpt-ad363-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "drgpt-ad363",
  storageBucket: "drgpt-ad363.firebasestorage.app",
  messagingSenderId: "449715385470",
  appId: "1:449715385470:web:ed04539b6f9d0a3a8f142f",
  measurementId: "G-TQP1C7WLVZ"
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
