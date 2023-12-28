// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        {/* First Logo */}
        <Image
          source={require('../assets/INFANTECH.png')} // Update with the path to your first logo
          style={styles.logo1}
        />

        {/* Second Logo */}
        <Image
          source={require('../assets/logo.png')} // Update with the path to your second logo
          style={styles.logo2}
        />
      </View>

      <Text style={styles.title}>Learn and Assess your Skills{'\n'}on Infant CPR Training</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.buttonText}>Let's Begin!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9D5E5', // Pastel pink background color
  },
  logoSection: {
    marginBottom: 10,
    alignItems: 'center',
  },
  logo1: {
    width: 350, // Adjust the width according to your design
    height: 350, // Adjust the height according to your design
  },
  logo2: {
    width: 380, // Adjust the width according to your design
    height: 85, // Adjust the height according to your design
    marginBottom: 10, // Increase this value to move logo2 upward
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7FAA', // Darker shade of pastel pink for the title
    textAlign: 'center', // Center the text
  },
  button: {
    backgroundColor: '#FF7FAA', // Darker pastel pink for the button
    padding: 10,
    borderRadius: 5,
    marginBottom: 220,
  },
  buttonText: {
    color: '#FFFFFF', // White text color for the button text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
