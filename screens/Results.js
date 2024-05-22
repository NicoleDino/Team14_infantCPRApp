import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, FlatList } from "react-native";
import { readObjectData } from "../utils/storage";

function Results({ navigation, route }) {
  const [scores, setScores] = useState({});
  const { timer } = route.params || { timer: 0 };

  // Ensure formatTime function is defined
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const goals = [
    { id: 1, text: "=====  REMEMBER YOUR GOALS 🎯  =====" },
    { id: 2, text: "           1. Achieve and complete 5 cycles" },
    { id: 3, text: "           2. Note that 1 cycle is:" },
    { id: 4, text: "                 ￫ 30 chest compressions" },
    { id: 5, text: "                 ￫ 2 rescue breaths" },
    { id: 6, text: "           > 1 cycle ≈ 30 seconds" },
    { id: 7, text: "           > 5 cycles ≈ 2 minutes & 30 seconds" },
  ];

  const handleBackToDashboardPress = () => {
    Alert.alert(
      'Back to Dashboard',
      'Done reviewing your results?',
      [
        {
          text: 'Not yet',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => navigation.navigate('Dashboard')
        }
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      // Gets the score stored in the storage
      console.log("*************************************");
      console.log("Retrieving score.");
  
      tmp = await readObjectData("scores");
      console.log(tmp)
  
      setScores(tmp);
    }

    fetchData();
  }, []);

  return (
    <FlatList
      data={[{ key: "content" }]}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/scoringbaby.png')}
              style={styles.logo}
            />
          </View>
          <FlatList
            data={goals}
            renderItem={({ item }) => (
              <View style={styles.goalItem}>
                <Text style={[styles.goalText, (item.id === 6 || item.id === 7) ? { fontWeight: 'bold' } : null]}>
                  {item.text}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
          <View style={styles.contentContainer}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>---++------------++------------++---</Text>
              <Text style={styles.scoreText}>YOUR SCORE 👶🏼</Text>
              <Text style={styles.scoreText}> ✱ Accomplished number of cycles: {scores.cycles} out of 5</Text>
              <Text style={styles.scoreText}>
                ✧  Failed Chest Compressions: {scores.mistakes_compressions}
              </Text>
              <Text style={styles.scoreText}>
                ✧ Failed Rescue Breaths: {scores.mistakes_rescue_breaths}
              </Text>
              {/* <Text style={styles.scoreText}>
                ⏱️ Standard Time: 2 minutes
              </Text> */}
              <Text style={styles.scoreText}>
                ⏱️ Time Consumed during Training: {formatTime(timer)}
              </Text>

            </View>
            <Image
              source={require('../assets/goodjob.png')} // Change the source to your image path
              style={{ width: 230, height: 230 }} // Adjust width and height as needed
            />

            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToDashboardPress}
            >
              <Text style={styles.backButtonText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      )}
      keyExtractor={item => item.key}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCE4EC",
    paddingTop: 40, 
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 20,
  },
  goalItem: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  goalText: {
    fontSize: 17,
    color: '#FF7FAA',
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  scoreContainer: {
    alignItems: "center",
    paddingBottom: 20, // Adjust this value as needed
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: "#FF7FAA",
  },
  backButton: {
    backgroundColor: "#FF7FAA",
    padding: 15,
    borderRadius: 8,
    marginBottom: 150,
    marginTop: 20,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Results;
