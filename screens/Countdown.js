import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const Countdown = ({ navigation }) => {
  const [countdown, setCountdown] = useState(3);
  const [sound, setSound] = useState(null);

  useEffect(() => {

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/start.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync(); 
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigation.navigate('MainCPR');
    }
  }, [countdown, navigation]);

  return (
    <View style={styles.container}>
      {countdown > 0 ? (
        <Text style={styles.countdown}>{countdown}</Text>
      ) : (
        <Text style={styles.startText}>START</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  countdown: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  startText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'purple',
  },
});

export default Countdown;
