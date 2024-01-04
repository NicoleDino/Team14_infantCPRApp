import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const gifs = [
  {
    id: '1',
    title: "Step 1: Tap the infant's foot",
    url: require('../assets/cprs1.gif'),
    instructions: "Evaluating the circumstances is the first step. Start by gently tapping your infant's foot",
  },
  {
    id: '2',
    title: 'Step 2: Check for pulse from the infant',
    url: require('../assets/cprs2.gif'),
    instructions: "If the infant doesn't flinch, use two fingers between his triceps and biceps to feel for a pulse. If you can't feel a pulse, move on to the following step and start CPR.",
  },
  {
    id: '3',
    title: 'Step 3: Call for emergency responders or 911',
    url: require('../assets/cprs3.gif'),
    instructions: "If there are people around and you assume your baby is struggling to breathe, ask them to phone an ambulance. If your infant and you are by yourself, follow these instructions for two minutes before calling for assistance. If you think your kid is suffering an allergic reaction, call 911 right away.",
  },
  {
    id: '4',
    title: 'Step 4: Perform 30 chest compressions',
    url: require('../assets/cprs4.gif'),
    instructions: "Chest compressions are the most crucial phase in the procedure. Find a firm, level surface to lay your infant down on first. Next, visualize a line connecting each nipple, and place two fingers slightly below it. Raise your infant's chest to his sternum by one (1) to one and a half (1.5) inches. Complete this step thirty times while maintaining a constant rate of 100 chest compressions per minute. To determine the appropriate pace, sing 'Stayin' Alive.' If your hand or fingers become fatigued, switch hands.",
  },
  {
    id: '5',
    title: 'Step 5: Perform rescue breaths',
    url: require('../assets/cprs5.gif'),
    instructions: "In cases where your infant remains unconscious and you want to do rescue breathing, start by using one hand to tilt his head back and the other to raise his chin in order to clear his airway. To let wind through, a small tilt is sufficient. Then, put your mouth over his nose and mouth, and take a slow, one-second breath into his lungs, pausing after every exhale. The size of his chest will rise, as you can see. Make sure to perform 2 rescue breaths to the infant.",
  },
  {
    id: '6',
    title: 'Step 6: Recovery position',
    url: require('../assets/cprs6.gif'),
    instructions: "If his pulse comes back, place him in the recovery posture, as shown below. Keep in mind to keep checking for a pulse until assistance comes. If your kid still won't respond or loses his pulse, start CPR again. If your baby is hot to the touch, it can be good to cool him down, and if he is cold, it might be good to warm him up. Even if you are able to get your kid to breathe again, once aid arrives, he will still need to be examined by a doctor to ensure his safety.",
  },
];

function Tutorial({ navigation }) {
  const handlePracticeCPR = () => {
    navigation.navigate('PracticeCPR');
  };

  const handleStartCPRTraining = () => {
    navigation.navigate('Pre_CPR');
  };

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.gifContainer}>
        <Image source={item.url} style={styles.gifImage} resizeMode="cover" />
      </View>

      <View style={styles.basicsContainer}>
        <Text style={styles.basicsTitle}>{item.title}</Text>
        <Text style={styles.instructions}>{item.instructions}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.mainTitle}>Infant CPR Tutorial: The Basics in Training</Text>

      <View style={styles.roundedContainer}>
        <FlatList
          data={gifs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{ width: '100%' }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cprButton} onPress={handlePracticeCPR}>
            <Text style={styles.buttonText}>Practice Mode</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cprButton} onPress={handleStartCPRTraining}>
            <Text style={styles.buttonText}>Begin Training</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FCE4EC',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  roundedContainer: {
    borderRadius: 10,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: 'white',
    padding: 20,
    margin: 10,
    width: '90%',
    flex: 1,
    backgroundColor: '#FFD1DC',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF7FAA',
    marginTop: 10,
    textAlign: 'center'
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
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'justify',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  cprButton: {
    backgroundColor: '#FF7FAA',
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gifContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gifImage: {
    width: '100%',
    height: '100%',
  },
});

export default Tutorial;
