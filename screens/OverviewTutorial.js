import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const OverviewTutorial = ({ navigation }) => {
  const handleNextPress = () => {
    navigation.navigate('TutorialCPR');
  };

  return (
    <View style={styles.container}>
      {/* Main Title */}
      <Text style={styles.mainTitle}>Infant CPR Training: The Basics</Text>

      {/* Rounded Container */}
      <View style={styles.roundedContainer}>
        {/* Overview Video Section */}
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>Overview Video</Text>
          {/* Include a Video Player for the introductory video here */}
          {/* You can use a library like react-native-video or a WebView for YouTube videos */}
        </View>

        {/* Basics of Infant CPR Section */}
        <View style={styles.basicsContainer}>
          <Text style={styles.basicsTitle}>Basics of Infant CPR - Text and Visual Aids</Text>
          {/* Provide text instructions and illustrations here */}
          <Text style={styles.instructions}>
            Play a short introductory video explaining the importance of infant CPR.
            Include real-life scenarios to emphasize the need for immediate action.
          </Text>
          {/* You can add visual aids or images here */}
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
          <Text style={styles.nextButtonText}>Next</Text>
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
  roundedContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FF7FAA',
    padding: 20,
    margin: 10,
    width: '90%',
    backgroundColor: 'white'
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF7FAA',
    marginTop: 10,
  },
  overviewContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF7FAA',
  },
  basicsContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  basicsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF7FAA',
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#FF7FAA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OverviewTutorial;
