// MainCPR.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function MainCPR({ navigation }) {
  const handleCheckResultsPress = () => {
    // Navigate to the Results screen
    navigation.navigate('Results');
  };

  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        {/* Content inside the rounded container goes here */}
        <Text style={styles.text}>Main CPR Content</Text>
      </View>

      {/* Check Results Button */}
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
    backgroundColor: '#FCE4EC', // Pink background for the outer container
  },
  roundedContainer: {
    width: '90%',
    height: '70%',
    backgroundColor: '#FFD1DC', // Lighter pink background for the inner content
    borderRadius: 20,
    borderWidth: 4, // Increased border thickness
    borderStyle: 'dashed',
    borderColor: '#FFF', // White border color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
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
});

export default MainCPR;
