// MainCPR.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function MainCPR({ navigation }) {
  const handleCheckResultsPress = () => {
    navigation.navigate('Results');
  };

  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <Text style={styles.text}>Main CPR Content</Text>
      </View>

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
    backgroundColor: '#FCE4EC', 
  },
  roundedContainer: {
    width: '90%',
    height: '70%',
    backgroundColor: '#FFD1DC', 
    borderRadius: 20,
    borderWidth: 4, 
    borderStyle: 'dashed',
    borderColor: '#FFF', 
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
