import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';

const OverviewTutorial = ({ navigation }) => {
  let soundObject = null;

  useEffect(() => {
    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  const handleNextPress = async () => {
    try {
      if (soundObject) {
        await soundObject.stopAsync();
      }
    } catch (error) {
      console.log('Error stopping audio: ', error);
    }
  
    Alert.alert(
      'Next: Infant CPR Tutorial',
      'Do you wish to proceed?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Proceed',
          onPress: () => {
            navigation.navigate('TutorialCPR');
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleBackToDashboardPress = () => {
    Alert.alert(
      'Back to Dashboard',
      'Do you wish to proceed?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Proceed',
          onPress: () => navigation.navigate('Dashboard')
        }
      ],
      { cancelable: false }
    );
  };

  const handleAudioPlayback = async (audioFile) => {
    try {
      if (soundObject) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
      }

      soundObject = new Audio.Sound();
      await soundObject.loadAsync(audioFile);
      await soundObject.playAsync();
    } catch (error) {
      console.log('Error playing sound: ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Infant CPR Training</Text>
        <View style={styles.roundedContainer}>
          <View style={styles.overviewContainer}>
            <Image
              source={require('../assets/cprbaby.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.basicsContainer}>
            <Text style={styles.imageText}>
              Infant CPR training is a specific instructional program created to teach 
              caregivers/parents/medical trainees the necessary abilities to save an infant's 
              life in an emergency. It includes teaching people how to identify and manage 
              respiratory distress, apply effective chest compressions, and give rescue breaths, 
              empowering them to confidently undertake life-saving actions in emergency situations.
              {'\n\n'}Having completed infant CPR training, those who care for them will be 
              well-equipped to handle emergency scenarios and possibly save a baby's life. 
              A step-by-step explanation is provided on "Infant CPR Training: The Basics," 
              which equips users with the necessary information and self-assurance to conduct 
              infant CPR effectively. Essential principles are covered in this course, including 
              how to identify respiratory distress signals and perform rescue breaths and chest compressions 
              correctly. Press next to learn more about it!
            </Text>
          </View>

          <TouchableOpacity style={styles.listenAudioContainer} onPress={() => handleAudioPlayback(require('../assets/overview.mp3'))}>
            <Icon name="volume-up" size={25} color="#FF7FAA" style={styles.speakerIcon} />
            <Text style={styles.listenAudioText}>Listen to audio</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToDashboardPress}>
              <Text style={styles.backButtonText}>Back to Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
    backgroundColor: 'white',
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
  nextButton: {
    backgroundColor: '#FF7FAA',
    paddingVertical: 15,
    paddingHorizontal: 55,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#FF7FAA',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: 20, 
    marginBottom: 10,
  },
  
  image: {
    width: '100%',
    height: 320,
    marginBottom: 10,
    borderRadius: 20,
  },
  imageText: {
    fontSize: 16,
    color: '#FF7FAA',
    marginTop: 10,
    textAlign: 'justify'
  },
  listenAudioContainer: {
    flexDirection: 'row',
    marginLeft: 25,
    marginTop: 20,
  },
  listenAudioText: {
    marginLeft: 5,
    color: '#FF7FAA',
  },
  speakerIcon: {
    marginRight: 5,
  },
});

export default OverviewTutorial;
