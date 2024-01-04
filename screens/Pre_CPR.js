// PreMainCPR.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function PreMainCPR({ navigation }) {
  const handleStartCPR = () => {
    navigation.navigate('MainCPR');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Getting Ready for Training</Text>

      {/* Rounded Container for Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>
          Follow these steps during training:
          {"\n\n"}
          1. Perform the PROPER chest compressions.
          {"\n\n"}
          2. Tilt head of infant manikin for rescue breaths, do it accordingly.
          {"\n\n"}
          3. The LED lights that you will observe represents visual feedbacks if your performance is correct (green) or wrong (red).
          {"\n\n"}
          4. Focus on the feedback on the app to see if what you are doing is proper.
          {"\n\n"}
          5. Treat the infant manikin with care, since it also has its life, which is in your hands.
          {"\n\n"}
          6. Don't forget to enjoy this knowledgeable training experience!
        </Text>
      </View>

      {/* Button to Start CPR */}
      <TouchableOpacity style={styles.startButton} onPress={handleStartCPR}>
        <Text style={styles.startButtonText}>Start CPR!</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7FAA',
  },
  instructionsContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FF7FAA',
    padding: 20,
    marginBottom: 20,
    width: '90%',
    backgroundColor: 'white',
  },
  instructions: {
    textAlign: 'left',
    fontSize: 18,
    color: '#FF7FAA',
  },
  startButton: {
    backgroundColor: '#FF7FAA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PreMainCPR;
