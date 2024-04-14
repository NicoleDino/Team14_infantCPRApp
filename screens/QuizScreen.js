import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigation = useNavigation();

  const quizQuestions = [
    {
      question: 'What does CPR stand for?',
      options: ['Cardiopulmonary Resuscitation', 'Central Processing Unit', 'Cerebral Palsy Rehabilitation'],
      correctAnswerIndex: 0
    },
    {
      question: 'Which is the correct compression-to-breath ratio for adult CPR?',
      options: ['30:2', '15:1', '10:1'],
      correctAnswerIndex: 0
    },
    {
      question: 'At what age does a human-being be in order to be called an infant or neonate?',
      options: ['1 to 3 years', '10 to 15 months', '0 to 12 months'],
      correctAnswerIndex: 2
    },
    // Add more questions here
  ];

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

  const handleAnswer = (selectedOptionIndex) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuizQuestion = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (!currentQuestion) {
      return (
        <View style={styles.container}>
          <Image
            source={require('../assets/quizbaby.png')}
            style={styles.resultImage}
            resizeMode="contain"
          />
          <Text style={styles.resultText}>Nice, you completed the quiz!</Text>
          <Text style={styles.resultText}>Here's your score: {score}/{quizQuestions.length}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToDashboardPress}>
              <Text style={styles.backButtonText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return renderQuizQuestion();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "#FF7FAA",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 10,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#FF7FAA',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
  },
  optionText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultImage: {
    width: 280, 
    height: 280, 
    marginBottom: 20,
    borderRadius: 20
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default QuizScreen;
