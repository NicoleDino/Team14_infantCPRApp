import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const PreQuizScreen = ({ navigation }) => {
  const handleStartQuiz = () => {
    Alert.alert(
      'Start Quiz',
      'Do you want to begin the quiz?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => navigation.navigate('Quiz')
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
        source={require('../assets/quizbaby.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Here's How It Works</Text>
      <Text style={styles.description}>
        Hi! Welcome to INFANTECH's CPR quiz, where you can test your knowledge about CPR procedures and techniques.
        You will be presented with multiple-choice questions. Select the correct answer for each question, based on your learnings.
        At the end of the quiz, you will be able to see your score. Goodluck!
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.startButton, styles.button]} onPress={handleStartQuiz}>
          <Text style={styles.startButtonText}>Start Quiz</Text>
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
    width: 290,
    height: 290,
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

export default PreQuizScreen;
