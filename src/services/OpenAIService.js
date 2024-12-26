import axios from 'axios';
import { fetchDocumentById } from '../constants/firebaseFunctions'; // Update the path as per your project structure

const TEXT_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

const OpenAIService = {
  /**
   * Sends a message to OpenAI's API and returns the response.
   * Includes user data from Firestore as context for personalized advice.
   * @param {Array} messages - The chat history, including system and user messages.
   * @param {string} userId - The ID of the current user.
   * @returns {Promise<string>} - The AI-generated response.
   */
  sendMessage: async (messages, userId) => {
    try {
      // Fetch user data from Firestore
      const [user, lifestyle, medicalHistory] = await Promise.all([
        fetchDocumentById('users', userId),
        fetchDocumentById('lifestyle', userId),
        fetchDocumentById('medicalHistory', userId),
      ]);

      // Format user data for the AI context
      const userDataContext = `
        User Profile:
        ${user ? JSON.stringify(user, null, 2) : 'No user data available'}

        Lifestyle Data:
        ${lifestyle ? JSON.stringify(lifestyle, null, 2) : 'No lifestyle data available'}

        Medical History:
        ${medicalHistory ? JSON.stringify(medicalHistory, null, 2) : 'No medical history available'}
      `;

      const response = await axios.post(
        TEXT_ENDPOINT,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a healthcare professional, providing advice in medical matters. Use the following user data for context: \n${userDataContext}`,
            },
            ...messages.map((msg) => ({
              role: msg.sender === 'AI' ? 'assistant' : 'user',
              content: msg.text,
            })),
          ],
          temperature: 0.7,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error in OpenAIService:', error);
      throw new Error('Failed to fetch AI response');
    }
  },
};

export default OpenAIService;
