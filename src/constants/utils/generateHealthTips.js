import moment from 'moment';
import axios from 'axios'; // Import axios
import { fetchDocumentById } from '../firebaseFunctions'; // Firebase helper functions
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';

// Initialize Firebase services
const auth = getAuth();
const firestore = getFirestore();

// OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const generateHealthTips = async () => {
  try {
    // Check if a user is logged in
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is currently logged in.');
    }

    const userId = user.uid;
    const today = moment().format('YYYY-MM-DD'); // Format date as YYYY-MM-DD
    const tipsCollection = collection(firestore, 'tips');
    const tipsDoc = doc(tipsCollection, userId);
    const tipsSnapshot = await getDoc(tipsDoc);

    // Check if tips for today already exist
    if (tipsSnapshot.exists()) {
      const tipsData = tipsSnapshot.data();
      if (tipsData.date === today) {
        console.log('Health tips for today already exist.');
        return tipsData; // Return existing tips
      }
    }

    // Fetch user-related data
    const userData = await fetchDocumentById('users', userId);
    const lifestyleData = await fetchDocumentById('lifestyle', userId);
    const medicalHistoryData = await fetchDocumentById('medicalHistory', userId);

    if (!userData && !lifestyleData && !medicalHistoryData) {
      throw new Error('No user data available to generate health tips.');
    }
    

    // Prepare the prompt for OpenAI API
    const prompt = `
    Based on the following user details, generate personalized health tips in strict JSON format:
    - User Details: ${JSON.stringify(userData)}
    - Lifestyle: ${JSON.stringify(lifestyleData)}
    - Medical History: ${JSON.stringify(medicalHistoryData)}
  
    Format the output as an array of objects with the following fields:
    [
      {
        "title": "Short title for the tip",
        "content": "Detailed description of the tip",
        "category": "Relevant category (e.g., nutrition, exercise, mental health)"
      },
      ...
    ]
  `;
  

    // Use axios to make the OpenAI API request
    const gptResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const responseText = gptResponse.data.choices[0]?.message?.content?.trim();
    if (!responseText) {
      throw new Error('Invalid response from OpenAI API.');
    }

    // Parse the response into tips
    let generatedTips;
    try {
      generatedTips = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error('Failed to parse OpenAI response. Ensure the response is valid JSON.');
    }

    // Validate and structure tips
    if (!Array.isArray(generatedTips)) {
      throw new Error('Generated tips are not in the expected array format.');
    }

    const healthTips = {
      date: today,
      userId,
      tips: generatedTips.map((tip, index) => ({
        id: `tip-${index + 1}`,
        title: tip.title || `Tip ${index + 1}`,
        content: tip.content || '',
        category: tip.category || 'general',
      })),
    };

    // Save the generated tips to Firestore
    await setDoc(tipsDoc, healthTips);

    console.log('Health tips generated and saved successfully:', healthTips);
    return healthTips;
  } catch (error) {
    console.error('Error generating health tips:', error.message);
    throw error; // Ensure the error propagates for higher-level handling
  }
};

export default generateHealthTips;
