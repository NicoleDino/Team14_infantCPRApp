import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';

const videos = [
  {
    id: '1',
    title: 'Basics of Infant CPR',
    url: 'https://www.youtube.com/embed/n65HW1iJUuY?autoplay=1',
    instructions: 'Place the infant on a firm surface. Use two fingers to compress the chest at least 1.5 inches deep at a rate of 100-120 compressions per minute.',
  },
  {
    id: '2',
    title: 'Basics of Infant CPR 2',
    url: 'https://www.youtube.com/embed/0FXzHFlmQmk?autoplay=1',
    instructions: 'New video instructions go here.',
  },
  {
    id: '3',
    title: 'Basics of Infant CPR 3',
    url: 'https://www.youtube.com/embed/YeDwkE9p52M?autoplay=1',
    instructions: 'Instructions for another new video.',
  },
  {
    id: '4',
    title: 'Basics of Infant CPR 4',
    url: 'https://www.youtube.com/embed/iyjL3eZlP90?autoplay=1',
    instructions: 'Instructions for yet another video.',
  },
  // Add more videos as needed
];

function Tutorial({ navigation }) {
  const handlePracticeCPR = () => {
    navigation.navigate('PracticeCPR');
  };

  const handleStartCPRTraining = () => {
    navigation.navigate('MainCPR');
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={() => alert(`Video ${item.title} clicked!`)}
      >
        <WebView
          source={{
            html: `
              <iframe
                width="100%"
                height="100%"
                src="${item.url}"
                frameborder="0"
                allowfullscreen
              ></iframe>
            `,
          }}
        />
      </TouchableOpacity>

      <View style={styles.basicsContainer}>
        <Text style={styles.basicsTitle}>{item.title}</Text>
        <Text style={styles.instructions}>{item.instructions}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      {/* Main Title */}
      <Text style={styles.mainTitle}>Infant CPR Training: The Basics</Text>

      {/* Rounded Container for Video List */}
      <View style={styles.roundedContainer}>
        {/* FlatList for Video List */}
        <FlatList
          data={videos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{ width: '100%' }}
        />

        {/* Horizontal Button Container */}
        <View style={styles.buttonContainer}>
          {/* Practice CPR Button */}
          <TouchableOpacity style={styles.cprButton} onPress={handlePracticeCPR}>
            <Text style={styles.buttonText}>Practice Mode</Text>
          </TouchableOpacity>

          {/* Start CPR Training Button */}
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
    backgroundColor: '#FCE4EC', // Set the background color to pastel pink
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
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 20,
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
  instructions: {
    textAlign: 'center',
    marginBottom: 10,
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
});

export default Tutorial;
