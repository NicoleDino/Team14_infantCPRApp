// PracticeCPR.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function PracticeCPR({ navigation }) {
  const handleNextPress = () => {
    navigation.navigate('MainCPR');
  };

  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <Text style={styles.text}>Practice CPR Content</Text>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Text style={styles.nextButtonText}>Next</Text>
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
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FF7FAA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#FF7FAA',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PracticeCPR;
