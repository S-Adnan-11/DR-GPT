import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Card, IconButton, Dialog, Portal, TextInput } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FloatingActionButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.fab}>
    <Text style={styles.fabText}>+</Text>
  </TouchableOpacity>
);

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null); // Tracks if editing
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: dayjs(),
  });

  // Load saved appointments on mount
  useEffect(() => {
    const loadAppointments = async () => {
      const savedAppointments = await AsyncStorage.getItem('appointments');
      if (savedAppointments) setAppointments(JSON.parse(savedAppointments));
    };
    loadAppointments();
  }, []);

  // Save appointments to storage whenever they change
  useEffect(() => {
    AsyncStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Request notification permissions and set up handlers
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications is required to set reminders.');
      }

      // Set up notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      // Register background notification handler once when component mounts
      Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    };

    requestPermission();
  }, []);

  // Handle background notification tap (optional, you can log or perform actions)
  const handleNotificationResponse = (response) => {
    const appointmentId = response.notification.request.identifier;
    Alert.alert('Appointment Reminder', `You have an appointment: ${appointmentId}`);
  };

  // Schedule reminder notification for appointment (5 minutes before)
  const scheduleNotification = async (appointment) => {
    const appointmentTime = dayjs(appointment.date);
    const reminderTime = appointmentTime.subtract(5, 'minute').toDate(); // 5 minutes before
    const currentTime = new Date();
  
    console.log('Reminder Scheduled Time:', reminderTime);
    console.log('Current Time:', currentTime);
  
    if (reminderTime > currentTime) {
      console.log('Scheduling reminder notification...');
      const reminderNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Appointment Reminder',
          body: `You have an appointment: "${appointment.title}" at ${appointmentTime.format('HH:mm')}`,
        },
        trigger: {
          date: reminderTime,
        },
      });
  
      console.log('Reminder notification scheduled with ID: ', reminderNotificationId); // Log reminder notification ID for debugging
    } else {
      Alert.alert('Error', 'The appointment time must be in the future to set a reminder.');
    }

    // Schedule main appointment notification at the scheduled appointment time
    const appointmentNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your Appointment',
        body: `Your appointment "${appointment.title}" is happening now.`,
      },
      trigger: {
        date: appointmentTime.toDate(), // Notification at the time of the appointment
      },
    });

    console.log('Appointment notification scheduled with ID: ', appointmentNotificationId);
  };

  // Save appointment
  const handleSaveAppointment = () => {
    if (!newAppointment.title) {
      Alert.alert('Error', 'Please enter a title for the appointment.');
      return;
    }

    const newAppt = { id: Date.now().toString(), ...newAppointment };

    if (editingAppointment) {
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === editingAppointment.id ? { ...editingAppointment, ...newAppointment } : appointment
        )
      );
    } else {
      setAppointments([...appointments, newAppt]);
    }

    // Schedule notification when a new appointment is saved
    scheduleNotification(newAppt);

    hideDialog();
  };

  const hideDialog = () => {
    setEditingAppointment(null);
    setNewAppointment({ title: '', date: dayjs() });
    setVisible(false);
  };

  const deleteAppointment = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    );
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setNewAppointment({ title: appointment.title, date: dayjs(appointment.date) });
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Appointments
      </Text>

      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={{
            [dayjs(newAppointment.date).format('YYYY-MM-DD')]: {
              selected: true,
              selectedColor: '#2260FF',
            },
          }}
          onDayPress={(day) =>
            setNewAppointment((prev) => ({
              ...prev,
              date: dayjs(prev.date)
                .year(day.year)
                .month(day.month - 1)
                .date(day.day),
            }))
          }
          theme={{
            selectedDayBackgroundColor: '#2260FF',
            todayTextColor: '#2260FF',
            arrowColor: '#2260FF',
          }}
        />
      </View>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{dayjs(item.date).format('YYYY-MM-DD HH:mm')}</Text>
            </View>
            <View style={styles.cardActions}>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => handleEditAppointment(item)}
                style={styles.editIcon}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => deleteAppointment(item.id)}
                style={styles.deleteIcon}
              />
            </View>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No appointments yet. Add one!</Text>}
      />

      <FloatingActionButton onPress={() => setVisible(true)} />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{editingAppointment ? 'Edit Appointment' : 'Add Appointment'}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={newAppointment.title}
              onChangeText={(text) => setNewAppointment({ ...newAppointment, title: text })}
              style={styles.input}
              mode="outlined"
            />
            <Text style={styles.label}>Pick a Date and Time:</Text>
            <DateTimePicker
              mode="single"
              date={newAppointment.date}
              onChange={({ date }) => setNewAppointment({ ...newAppointment, date })}
              timePicker
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleSaveAppointment}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  header: { marginBottom: 20, fontWeight: 'bold', color: '#2260FF', textAlign: 'center' },
  calendarContainer: { marginBottom: 20, backgroundColor: '#FFF', borderRadius: 10, elevation: 5 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, marginBottom: 10, borderRadius: 10, backgroundColor: '#FFF', elevation: 3 },
  cardContent: { flex: 1 },
  title: { fontWeight: 'bold', color: '#333' },
  subtitle: { color: '#666' },
  cardActions: { flexDirection: 'row' },
  editIcon: { backgroundColor: '#BBDEFB' },
  deleteIcon: { backgroundColor: '#FFCDD2' },
  input: { marginBottom: 15 },
  label: { fontWeight: '600', marginBottom: 5, color: '#333' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#2260FF', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  fabText: { color: '#FFF', fontSize: 30 },
});

export default AppointmentsScreen;
