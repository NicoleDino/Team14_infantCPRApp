// Pre_PracCPR.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from 'react-native';
import cprGif from '../assets/loadingPrac.gif'; // Adjust the path as needed

function Pre_PracCPR({ navigation }) {
  const handleStartCPR = () => {
    Alert.alert(
      'Begin Infant CPR Practice',
      'Start the practice?',
      [
        {
          text: 'Not yet',
          style: 'cancel'
        },
        {
          text: 'Absolutely!',
          onPress: () => navigation.navigate('PracticeCPR')
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

  const instructionsData = [
    {
      id: 'note',
      text: "**Note: This is only a quick demo of how the actual infant CPR training will look. This is to allow the trainees to grasp how the training will work. This will NOT serve as the actual training and will NOT display any scores. Good luck!"
    },
    {
      id: '1',
      text: "1. Perform the PROPER compressions on the infant manikin's chest."
    },
    {
      id: '2',
      text: "2. The application will show if the accurate pressure is achieved. The infant manikin provides an audio feedback if the pressure is too much."
    },
    {
      id: '3',
      text: "3. Perform blows or rescue breaths on the infant manikin's mouth."
    },
    {
      id: '4',
      text: "4. Visual feedbacks can be observed if your performance is correct (green) or wrong (red) on the infant manikin as well as on the application."
    },
    {
      id: '5',
      text: "5. Remember that you should perform 5 cycles as a standard to the training."
    },
    {
      id: '6',
      text: "6. Enjoy your practice training!"
    },
    {
      id: 'gif',
      isGif: true,
      source: cprGif
    },
  ];

  const renderInstructionItem = ({ item }) => {
    if (item.id === 'note') {
      return (
        <View style={styles.noteContainer}>
          <Text style={styles.note}>{item.text}</Text>
        </View>
      );
    } else if (item.isGif) {
      return (
        <View style={styles.gifContainer}>
          <Image source={item.source} style={styles.gif} />
        </View>
      );
    } else {
      return (
        <View style={styles.instructionItem}>
          <Text style={styles.instructions}>{item.text}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice Guidelines</Text>

      <FlatList
        data={instructionsData}
        renderItem={renderInstructionItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackToDashboardPress}>
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startButton} onPress={handleStartCPR}>
          <Text style={styles.startButtonText}>Begin Practice!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: '#FF7FAA',
    textAlign: 'center'
  },
  noteContainer: {
    borderWidth: 1,
    borderColor: '#FF7FAA',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FCE4EC',
    width: '100%',
  },
  note: {
    fontSize: 16,
    color: '#FF7FAA',
    textAlign: 'justify',
  },
  flatList: {
    width: '90%',
    marginBottom: 20,
  },
  instructionItem: {
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FF7FAA',
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#FCE4EC',
  },
  instructions: {
    textAlign: 'left',
    fontSize: 18,
    color: '#FF7FAA',
  },
  gifContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  gif: {
    width: 300,
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  startButton: {
    backgroundColor: '#FF7FAA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#FF7FAA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Pre_PracCPR;
