import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import { readObjectData } from "../utils/storage";

function Results({ navigation, route }) {
  const [scores, setScores] = useState({});
  const { mainScore, compressionsScore, breathsScore } = route.params || {
    mainScore: 0,
    compressionsScore: 0,
    breathsScore: 0,
  };

  const handleBackToDashboardPress = () => {
    navigation.navigate("Dashboard");
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
      <View style={styles.contentContainer}>
        <Text style={styles.scoreText}>--++------------++------------++--</Text>
        <Text style={styles.scoreText}>✅ Accomplished number of cycles: {scores.cycles}</Text>
        <Text style={styles.scoreText}>
          ❌ Failed Chest Compressions: {scores.mistakes_compressions}
        </Text>
        <Text style={styles.scoreText}>
          ❌ Failed Rescue Breaths: {scores.mistakes_rescue_breaths}
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
    width: 300,
    height: 200,
    marginBottom: 15,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF7FAA",
  },
  backButton: {
    backgroundColor: "#FF7FAA",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Results;
