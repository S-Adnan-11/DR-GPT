import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Animated,
  Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OpenAIService from '../../services/OpenAIService';
import { auth } from '../../constants/FireBaseConfig';
import { fetchDocumentById } from '../../constants/firebaseFunctions'; // Adjust path as necessary

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1)); // For fade-out animation

  const userId = auth.currentUser?.uid; // Ensure user is logged in
  const scrollViewRef = useRef();

  // Load messages from local storage
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(`chat_${userId}`);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoadingMessages(false);
      }
    };
    loadMessages();
  }, [userId]);

  // Save messages to local storage
  const saveMessages = async (updatedMessages) => {
    try {
      await AsyncStorage.setItem(
        `chat_${userId}`,
        JSON.stringify(updatedMessages)
      );
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  // Delete all messages
  const handleDeleteMessages = () => {
    Alert.alert(
      'Delete Chat',
      'Are you sure you want to delete all chat data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start(async () => {
              setMessages([]);
              await AsyncStorage.removeItem(`chat_${userId}`);
              fadeAnim.setValue(1); // Reset animation
            });
          },
        },
      ]
    );
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const userMessage = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        sender: 'User',
        text: inputText,
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputText('');
      setIsLoading(true);

      try {
        await saveMessages(updatedMessages);

        // Fetch user-specific data
        const [user, lifestyle, medicalHistory] = await Promise.all([
          fetchDocumentById('users', userId),
          fetchDocumentById('lifestyle', userId),
          fetchDocumentById('medicalHistory', userId),
        ]);

        // Prepare AI response
        const aiResponse = await OpenAIService.sendMessage(updatedMessages, userId, {
          user,
          lifestyle,
          medicalHistory,
        });

        if (aiResponse) {
          const aiMessage = {
            id: `${Date.now()}_AI_${Math.random().toString(36).substr(2, 9)}`,
            sender: 'AI',
            text: aiResponse,
            timestamp: new Date().toISOString(),
          };

          const finalMessages = [...updatedMessages, aiMessage];
          setMessages(finalMessages);
          await saveMessages(finalMessages);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Message cannot be empty!');
    }
  };

  if (loadingMessages) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#0078FF" />
        <Text style={styles.loadingText}>Loading chat...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat with Dr. GPT</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteMessages}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Container */}
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                msg.sender === 'User' ? styles.userMessageRow : styles.aiMessageRow,
              ]}
            >
              {msg.sender === 'AI' && (
                <Image
                  source={require('../../../assets/ai-avatar.png')}
                  style={styles.avatar}
                />
              )}
              <View
                style={[
                  styles.messageBubble,
                  msg.sender === 'User' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text
                  style={msg.sender === 'User' ? styles.userText : styles.aiText}
                >
                  {msg.text}
                </Text>
              </View>
              {msg.sender === 'User' && (
                <Image
                  source={require('../../../assets/male-avatar.png')}
                  style={styles.avatar}
                />
              )}
            </View>
          ))}
        </Animated.View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0078FF" />
            <Text style={styles.loadingText}>AI is typing...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity
          style={[styles.sendButton, isLoading && styles.disabledButton]}
          onPress={!isLoading ? handleSendMessage : null}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5fa',
  },
  header: {
    height: 60,
    backgroundColor: '#0078FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  aiMessageRow: {
    justifyContent: 'flex-start',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 15,
    borderRadius: 20,
  },
  aiBubble: {
    backgroundColor: '#e3e8f5',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#0078FF',
    alignSelf: 'flex-end',
  },
  aiText: {
    color: '#333',
    fontSize: 16,
  },
  userText: {
    color: '#fff',
    fontSize: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: '#f2f5fa',
    borderRadius: 22.5,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#0078FF',
    borderRadius: 22.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0078FF',
  },
  deleteButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
