// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <View style={styles.roundedContainer}>
          <Image
            source={require('../assets/newLogo.png')}
            style={styles.logo1}
          />
        </View>
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
  roundedContainer: {
    borderRadius: 200, 
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#FFE3EF', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  logo1: {
    width: 250, 
    height: 250, 
  },
  logo2: {
    width: 380, 
    height: 85, 
    marginBottom: 10, 
    marginTop: 20
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
    padding: 19,
    borderRadius: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
