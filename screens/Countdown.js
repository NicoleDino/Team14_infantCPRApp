import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
      <Image
        source={require('../assets/loading.gif')}
        style={styles.gif}
      />
      {countdown > 0 ? (
        <Text style={styles.countdown}>{countdown}</Text>
      ) : (
        <View style={styles.startButton}>
          <Text style={styles.startText}>START</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCE4EC', 
  },
  gif: {
    width: 200, 
    height: 200,
    marginBottom: 20, 
  },
  countdown: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FF7FAA',
    marginBottom: 100 
  },
  startButton: {
    alignItems: 'center',
  },
  startText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FF7FAA', 
    marginTop: 10, 
    marginBottom: 100
  },
});

export default Countdown;
