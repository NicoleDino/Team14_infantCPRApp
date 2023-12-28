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
          source={require('../assets/INFANTECH.png')}
          style={styles.logo1}
        />

        {/* Second Logo */}
        <Image
          source={require('../assets/logo.png')} 
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
    backgroundColor: '#F9D5E5', 
  },
  logoSection: {
    marginBottom: 10,
    alignItems: 'center',
  },
  logo1: {
    width: 350, 
    height: 350, 
  },
  logo2: {
    width: 380, 
    height: 85, 
    marginBottom: 10, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7FAA', 
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF7FAA', 
    padding: 10,
    borderRadius: 5,
    marginBottom: 220,
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
