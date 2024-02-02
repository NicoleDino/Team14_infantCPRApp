import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import io from 'socket.io-client';

function MainCPR({ navigation }) {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState('');

  useEffect(() => {
    const newSocket = io('http://192.168.68.109:5000', { transports: ['websocket'] });
    setSocket(newSocket);

    newSocket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected:', reason);
    });

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (socket != null) {
      socket.on('connect', () => {
        console.log('Connected to Flask server');
      });
  
      socket.on('arduino_data', (receivedData) => {
        console.log('Received data from server:', receivedData);
        // Extract information from the received data
        const { flow_rate, peak_flow_rate, frequency, status } = receivedData;
  
        // Update your UI with the received information
        setData(`Flow Rate: ${flow_rate} mL/s\nPeak Flow Rate: ${peak_flow_rate} mL/s\nFrequency: ${frequency.toFixed(2)} Hz\nStatus: ${status}`);
      });
    }
  }, [socket]);

  const handleCheckResultsPress = () => {
    navigation.navigate('Results');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perform Infant CPR!</Text>
      <View style={styles.roundedContainer}>
        {/* Display data immediately */}
        <Text style={styles.text}>{data}</Text>
      </View>

      <TouchableOpacity style={styles.checkResultsButton} onPress={handleCheckResultsPress}>
        <Text style={styles.checkResultsButtonText}>Check Results!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCE4EC',
  },
  roundedContainer: {
    width: '90%',
    height: '70%',
    backgroundColor: '#FFD1DC',
    borderRadius: 20,
    borderWidth: 4,
    borderStyle: 'dashed',
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  checkResultsButton: {
    backgroundColor: '#FF7FAA',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  checkResultsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7FAA',
  },
});

export default MainCPR;
