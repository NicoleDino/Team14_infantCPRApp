import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const PreFourPics = ({ navigation }) => {
  const handleStartGame = () => {
    Alert.alert(
      'Start Game',
      'Do you want to begin the game?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => navigation.navigate('FourPicsGame')
        }
      ],
      { cancelable: false }
    );
  };

  const handleBackToDashboardPress = () => {
    Alert.alert(
      'Back to Dashboard',
      'Do you wish to proceed?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Proceed',
          onPress: () => navigation.navigate('Dashboard')
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/fourpicsgame.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Four Pics One Word Game</Text>
      <Text style={styles.description}>
        Welcome to the Four Pics One Word game! In this game, you will be shown four images, and you need to guess the word that connects them. Are you ready to start?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.startButton, styles.button]} onPress={handleStartGame}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.backButton, styles.button]} onPress={handleBackToDashboardPress}>
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7FAA',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'justify',
    marginBottom: 40,
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 14,
  },
  startButton: {
    backgroundColor: '#FF7FAA',
    padding: 15,
    borderRadius: 8,
    marginBottom: 80,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#FF7FAA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 80,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PreFourPics;
