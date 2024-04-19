import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigation = useNavigation();

  const quizQuestions = [
    {
      question: '1. What does CPR stand for?',
      options: ['A) Cardiopulmonary Resuscitation', 
      'B) Central Processing Unit', 
      'C) Cerebral Palsy Rehabilitation'],
      correctAnswerIndex: 0
    },
    {
      question: '2. At what age does a human-being be in order to be called an infant or neonate?',
      options: ['A) 1 to 3 years', 
      'B) 10 to 15 months', 
      'C) 0 to 12 months'],
      correctAnswerIndex: 2
    },
    {
      question: '3. What is the recommended compression-to-ventilation ratio for infant CPR according to the latest guidelines?',
      options: ['A) 15 compressions to 2 ventilations', 
      'B) 30 compressions to 2 ventilations', 
      'C) 10 compressions to 1 ventilation',
      'D) 5 compressions to 1 ventilation'],
      correctAnswerIndex: 1
    },
    {
      question: '4. What is the depth of chest compressions for infant CPR as per the latest guidelines?',
      options: ['A) 2 inches (5 centimeters)', 
      'B) 1 inch (2.5 centimeters)', 
      'C) 1.5 inches (4 centimeters)',
      'D) 3 inches (7.5 centimeters)'],
      correctAnswerIndex: 2
    },
    {
      question: '5. According to the latest standard, where should rescuers position their hands when performing chest compressions on an infant?',
      options: ['A) On the upper half of the sternum', 
      "B) Between the infant's eyes", 
      'C) On the lower half of the sternum, between the nipples',
      "D) On the infant's abdomen"],
      correctAnswerIndex: 2
    },
    {
      question: '6. What is the recommended rate for chest compressions in infant CPR according to the latest guidelines?',
      options: ['A) 50-110 compressions per minute', 
      'B) 80-100 compressions per minute', 
      'C) 100-120 compressions per minute',
      'D) 120-130 compressions per minute'],
      correctAnswerIndex: 2
    },
    {
      question: '7. In infant CPR, what is the technique for delivering ventilations/Rescue Breaths?',
      options: ['A) Mouth-to-mouth only', 
      'B) Nose-to-mouth only', 
      'C) Mouth-to-mouth-and-nose',
      'D) Mouth-to-chin'],
      correctAnswerIndex: 2
    },
    {
      question: '8. What is the first step to take when encountering an unresponsive infant?',
      options: ['A) Check for breathing', 
      'B) Check for responsiveness', 
      'C) Check for pulse',
      'D) Call emergency services'],
      correctAnswerIndex: 1
    },
    {
      question: '9. If an infant is unresponsive and not breathing normally, what should rescuers do next?',
      options: ['A) Begin chest compressions', 
      'B) Perform abdominal thrusts', 
      'C) Perform a head tilt-chin lift maneuver',
      'D) Administer oxygen'],
      correctAnswerIndex: 0
    },
    {
      question: '10. What should rescuers do if they suspect an infant has a foreign object obstructing the airway?',
      options: ['A) Perform abdominal thrusts', 
      'B) Administer back blows and chest thrusts', 
      'C) Start CPR immediately',
      'D) Give the infant water to try to flush the object out'],
      correctAnswerIndex: 1
    },
    {
      question: '11. According to the latest guidelines, when should rescuers stop CPR efforts on an infant? (choose the best answer)',
      options: ['A) After 5 minutes of CPR', 
      'B) If the infant starts to cry', 
      'C) If the infant starts to breathe normally',
      'D) If an AED becomes available',
      'E) When Emergency medical services (EMS) personnel arrive on the scene '],
      correctAnswerIndex: 4
    },
    {
      question: '12. What is the recommended sequence of actions in the CPR process for an infant?',
      options: ['A) Activate EMS, check for breathing, begin CPR', 
      'B) Begin CPR, check for responsiveness, activate EMS', 
      'C) Check for responsiveness, activate EMS, begin CPR',
      'D) Begin CPR, activate EMS, check for responsiveness'],
      correctAnswerIndex: 2
    },
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
    marginLeft: 20,
    marginRight: 20,
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
    width: 300, 
    height: 300, 
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
