import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageService = {
  getMessages: async () => {
    try {
      const storedMessages = await AsyncStorage.getItem('chatMessages');
      return storedMessages ? JSON.parse(storedMessages) : [];
    } catch (error) {
      console.error('Error fetching messages from storage:', error);
      return [];
    }
  },

  saveMessages: async (messages) => {
    try {
      await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages to storage:', error);
    }
  },

  clearMessages: async () => {
    try {
      await AsyncStorage.removeItem('chatMessages');
    } catch (error) {
      console.error('Error clearing messages from storage:', error);
    }
  },
};

export default StorageService;
