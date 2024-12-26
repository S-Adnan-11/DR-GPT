import { db } from './FireBaseConfig';
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    updateDoc, 
    doc, 
    deleteDoc, 
    getDoc, 
    serverTimestamp 
} from 'firebase/firestore';

/**
 * Section 1: Lifestyle Data Functions
 * These functions handle CRUD operations for the 'lifestyle' collection.
 */

/**
 * Adds a document to the 'lifestyle' collection.
 * @param {string} userId - The ID of the user.
 * @param {Object} lifestyleData - Lifestyle data to save.
 * @returns {Promise<string>} - The ID of the added document.
 */
export const addLifestyleData = async (userId, lifestyleData) => {
    try {
        const docRef = await addDoc(collection(db, 'lifestyle'), { 
            userId, 
            createdAt: serverTimestamp(),
            ...lifestyleData 
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding lifestyle data:', error);
        throw error;
    }
};

/**
 * Fetches documents from the 'lifestyle' collection for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - List of documents from the collection.
 */
export const getLifestyleData = async (userId) => {
    try {
        const q = query(collection(db, 'lifestyle'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching lifestyle data:', error);
        throw error;
    }
};

export const addOrUpdateHealthTips = async (userId, healthTips) => {
    try {
        const docRef = doc(db, 'midicalHistory', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Update existing document
            await updateDoc(docRef, {
                healthTips,
                updatedAt: serverTimestamp(),
            });
        } else {
            // Create a new document
            await setDoc(docRef, {
                userId,
                healthTips,
                createdAt: serverTimestamp(),
            });
        }
        console.log('Health tips successfully added/updated.');
    } catch (error) {
        console.error('Error adding/updating health tips:', error);
        throw error;
    }
};
/**
 * Section 2: Health Tips Functions
 * These functions handle CRUD operations for the 'healthTips' collection.
 */

export const getHealthTips = async (userId) => {
    try {
        const docRef = doc(db, 'tips', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const healthTips = docSnap.data();
            console.log('Health tips retrieved:', healthTips);
            return healthTips;
        } else {
            console.log('No health tips found for user:', userId);
            return null;
        }
    } catch (error) {
        console.error('Error fetching health tips for user:', userId, error);
        if (error.code === 'permission-denied') {
            alert('You do not have permission to access health tips. Please contact support.');
        }
        throw error;
    }
};


const fetchHealthTips = async (userId) => {
  const healthTipsRef = doc(db, 'tips', userId);  // Reference to the user's health tips document
  try {
    const docSnap = await getDoc(healthTipsRef);
    if (docSnap.exists()) {
      console.log('Health Tips:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No health tips available for this user.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching health tips:', error);
    throw new Error('Unable to fetch health tips');
  }
};

/**
 * Section 3: General Document Fetching and Deleting Functions

/**
 * Deletes a document from a Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document to delete.
 * @returns {Promise<void>}
 */
export const deleteDocument = async (collectionName, docId) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        console.log('Document deleted successfully.');
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};


/**
 * Section 4: Document Update Function
 * This function is used to update an existing document in a Firestore collection.
 */

/**
 * Updates a document in a Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document to update.
 * @param {Object} updatedData - The data to update in the document.
 * @returns {Promise<void>}
 */
export const updateDocument = async (collectionName, docId, updatedData) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, updatedData);
        console.log('Document updated successfully.');
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
};



// Function to fetch user data (e.g., lifestyle, medical history) and health tips
const fetchUserData = async (userId) => {
  try {
    const userData = await fetchDocumentById('users', userId);  // Fetch user data from Firestore
    
    if (userData && userData.name) {  // Check if user data has a 'name' field
      // Proceed to fetch health tips if userData is available
      setUserName(userData.name); // Set the user name or other relevant user data
      fetchHealthTips(userId);  // Call function to fetch health tips
    } else {
      console.error('User data is missing or user has no name');
      // Handle the case where userData is missing or incomplete
      setErrorMessage('User data not found, please try again later.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    setErrorMessage('Failed to fetch user data. Please try again later.');
  }
};

  



/**
 * Fetches a single document from a collection by ID.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document to fetch.
 * @returns {Promise<Object|null>} - The document data or null if not found.
 */
export const fetchDocumentById = async (collectionName, docId) => {
  try {
    console.log(`Fetching document from collection: ${collectionName}, ID: ${docId}`);
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log(`No document found in collection ${collectionName} for doc ID ${docId}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};
