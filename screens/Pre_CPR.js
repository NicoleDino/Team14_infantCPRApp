import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

function PreMainCPR({ navigation }) {
  const handleStartCPR = () => {
    navigation.navigate('MainCPR');
  };

  const handleBackToDashboardPress = () => {
    navigation.navigate('Dashboard');
  };

  const instructionsData = [
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
      text: "5. After completing the 5 cycles of CPR procedure, don't forget to click on the Check Results to determine if you have acquired the correct skills for infant CPR"
    },
    {
      id: '6',
      text: "6. Remember to treat the infant manikin with care, its life will now depend on your hands."
    },
    {
      id: '7',
      text: "7. Don't forget to enjoy this knowledgeable training experience!"
    }
  ];

  const renderInstructionItem = ({ item }) => (
    <View style={styles.instructionItem}>
      <Text style={styles.instructions}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to perform the INFANTECH'S CPR training?</Text>

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
          <Text style={styles.startButtonText}>Start CPR Training!</Text>
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
    backgroundColor: '#FCE4EC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: '#FF7FAA',
    textAlign: 'center'
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
    backgroundColor: 'white',
  },
  instructions: {
    textAlign: 'left',
    fontSize: 18,
    color: '#FF7FAA',
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

export default PreMainCPR;
