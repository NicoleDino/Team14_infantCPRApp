// DashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function DashboardScreen({ navigation }) {
  const handleTutorialPress = () => {
    navigation.navigate('OverviewTutorial');
  };

  {/*const handlePracticeCPRPress = () => {
    navigation.navigate('PracticeCPR');
  };*/}

  const handlePre_CPRPress = () => {
    navigation.navigate('Pre_CPR');
  };

  const handleMorePress = () => {
    navigation.navigate('More');
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.title}>Welcome, CPR Trainees!</Text>
        <Image
          source={require('../assets/cprgif.gif')}
          style={styles.cprGif}
        />
        <Text style={styles.subtitle}>
          Learn essential infant CPR techniques to save a life! Follow the tutorial, practice CPR,
          and enhance your skills for emergency situations.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleTutorialPress}>
            <Text style={styles.buttonText}>Infant CPR Procedure and Tutorials</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity style={styles.button} onPress={handlePracticeCPRPress}>
            <Text style={styles.buttonText}>Infant CPR Training: Practice Mode</Text>
  </TouchableOpacity>*/}
          <TouchableOpacity style={styles.button} onPress={handlePre_CPRPress}>
            <Text style={styles.buttonText}>Infant CPR Training: Implement and Assess your Skills</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleMorePress}>
            <Text style={styles.buttonText}>Learn More!</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  rectangle: {
    width: width - 40, 
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: 40,
    borderColor: '#FF7FAA',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7FAA', 
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 40,
    color: '#333', 
    textAlign: 'center',
    fontSize: 14
  },
  cprGif: {
    width: 350,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-around',
    width: '90%',
  },
  button: {
    backgroundColor: '#FF7FAA',
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center', 
    fontSize: 15
  },
});

export default DashboardScreen;
