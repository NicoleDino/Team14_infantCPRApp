import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, FlatList } from "react-native";

import { readObjectData } from "../utils/storage";

function Results({ navigation, route }) {
  const [scores, setScores] = useState({});
  const { mainScore, compressionsScore, breathsScore } = route.params || {
    mainScore: 0,
    compressionsScore: 0,
    breathsScore: 0,
  };

  const goals = [
    { id: 1, text: "===== REMEMBER YOUR GOALS 🎯 =====" },
    { id: 2, text: "           1. Achieve and complete 5 cycles" },
    { id: 3, text: "           2. Note that 1 cycle is:" },
    { id: 4, text: "                 ￫ 30 chest compressions" },
    { id: 5, text: "                 ￫ 2 rescue breaths" },
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
            <Text style={styles.goalText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.scoreText}>---++------------++------------++---</Text>
        <Text style={styles.scoreText}>YOUR SCORE 👶🏼</Text>
        <Text style={styles.scoreText}> ✱ Accomplished number of cycles: {scores.cycles} out of 5</Text>
        <Text style={styles.scoreText}>
        ✧  Failed Chest Compressions: {scores.mistakes_compressions}
        </Text>
        <Text style={styles.scoreText}>
        ✧ Failed Rescue Breaths: {scores.mistakes_rescue_breaths}
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToDashboardPress}
        >
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 15,
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
