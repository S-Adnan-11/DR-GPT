import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, List, Divider } from 'react-native-paper';

const notifications = [
  { id: '1', title: 'Appointment Reminder', description: 'You have an appointment with Dr. Smith at 10:00 AM tomorrow.' },
  { id: '2', title: 'Lab Results Ready', description: 'Your lab results are ready for viewing.' },
  { id: '3', title: 'Health Tip', description: 'Drink at least 8 glasses of water today for better hydration.' },
  { id: '4', title: 'Insurance Update', description: 'Your insurance policy has been updated successfully.' },
];

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.headerText}>
        Notifications
      </Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <List.Item
              title={item.title}
              description={item.description}
              left={(props) => <List.Icon {...props} icon="bell-ring" />}
            />
            <Divider />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  headerText: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
