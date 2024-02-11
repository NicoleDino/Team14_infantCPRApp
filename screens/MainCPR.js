import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import io from 'socket.io-client';

function MainCPR({ navigation }) {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState({
    flow_rate: 0,
    status: '',
    realtime_pressure: 0
  });  
  const [thresholdMessage, setThresholdMessage] = useState('');

  useEffect(() => {
    const newSocket = io('http://192.168.68.107:5000', { transports: ['websocket'] });
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
      socket.on('arduino_data', (receivedData) => {
        console.log('Received data from server:', receivedData);
        setData({
            flow_rate: receivedData.flow_rate,
            status: receivedData.status,
            realtime_pressure: receivedData.realtime_pressure
        });
    });    

      socket.on('realtime_pressure', (pressure) => {
        console.log('Received real-time pressure from server:', pressure);
        setData((prevData) => ({ ...prevData, realtime_pressure: pressure }));
      });

      socket.on('threshold_message', (message) => {
        console.log('Received threshold message from server:', message);
        setThresholdMessage(message);
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
        <Text style={styles.text}>Flow Rate: {data.flow_rate} mL/s</Text>
        <Text style={styles.text}>Flow Status: {data.status}</Text>
        <Text style={styles.text}>Detected Pressure: {data.realtime_pressure} PSI</Text>
        <Text style={styles.text}>Pressure Status: {thresholdMessage}</Text>
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
    marginBottom: 10,
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