// Results.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Results({ navigation, route }) {
  // Extract the scores from the route params
  const { mainScore, compressionsScore, breathsScore } = route.params || {
    mainScore: 0,
    compressionsScore: 0,
    breathsScore: 0,
  };

  const handleBackToDashboardPress = () => {
    // Navigate back to the Dashboard
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Display the CPR scores */}
      <Text style={styles.scoreText}>Overall Score: {mainScore}%</Text>
      <Text style={styles.scoreText}>Chest Compressions Score: {compressionsScore}%</Text>
      <Text style={styles.scoreText}>Rescue Breaths Score: {breathsScore}%</Text>

      {/* Back to Dashboard Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackToDashboardPress}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
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
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF7FAA',
  },
  backButton: {
    backgroundColor: '#FF7FAA',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Results;
