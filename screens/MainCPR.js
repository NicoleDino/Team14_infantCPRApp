// MainCPR.js

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import io from "socket.io-client";

// Gamified components
import PumpingHeart from "../components/PumpingHeart.jsx";
import RescueBreathIndicator from "../components/RescueBreathIndicator.jsx";

// For storing data
import { storeObjectData, readObjectData } from "../utils/storage.js";

function MainCPR({ navigation }) {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState({
    flow_rate: 0,
    status: "None",
    realtime_pressure: 0,
  });
  const [thresholdMessage, setThresholdMessage] = useState("None");
  const [rescueBreathReady, setRescueBreathReady] = useState(false);

  // Timer state
  const [timer, setTimer] = useState(0);

  // Gets the current count of compressions and rescue breaths
  const [cyclesCount, setCyclesCount] = useState(0);
  const [compressionCount, setCompressionCount] = useState(0);
  const [rescueBreathCount, setRescueBreathCount] = useState(0);

  const [trainingActive, setTrainingActive] = useState(true);

  useEffect(() => {
    const newSocket = io("http://192.168.74.2:5000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
    });

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (socket != null) {
      // Checks if rescue breath is ready
      socket.on("rescue_breath_ready", (message) => {
        console.log("Rescue breath ready:", message);
        setRescueBreathReady(message);
      });

      socket.on("arduino_data", (receivedData) => {
        console.log("Received data from server:", receivedData);
        setData({
          flow_rate: receivedData.flow_rate,
          status: receivedData.status,
          realtime_pressure: receivedData.realtime_pressure,
        });
      });

      socket.on("realtime_pressure", (pressure) => {
        console.log("Received real-time pressure from server:", pressure);
        setData((prevData) => ({ ...prevData, realtime_pressure: pressure }));
      });

      socket.on("threshold_message", (message) => {
        console.log("Received threshold message from server:", message);
        setThresholdMessage(message);
      });

      // Gets the number of compressions
      socket.on("compression_count", (count) => setCompressionCount(count));

      // Gets the number of rescue breaths
      socket.on("rescue_breath_count", (count) => setRescueBreathCount(count));

      // Gets the number of cycles
      socket.on("cycle_count", (count) => setCyclesCount(count));

      // Checks if the game ended and received the score
      socket.on("scores", async (data) => {
        if (data["game_end"] == true) {
          try {
            await storeObjectData("scores", data);

            // When the game ends, receive a pop up that tells that the user finished training
            Alert.alert("Congratulations!", "You completed the CPR training!", [
              { text: "Check Results", onPress: handleCheckResultsPress },
            ]);
          } catch (err) {
            console.log("Error saving data: ", err);
          }
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket != null && trainingActive) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;
          storeObjectData("elapsedTime", newTimer);
          return newTimer;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [socket, trainingActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleCheckResultsPress = async () => {
    const storedElapsedTime = await readObjectData("elapsedTime");
    navigation.navigate("Results", { timer: storedElapsedTime });
  };

  const handleBackToDashboardPress = () => {
    Alert.alert(
      "Back to Dashboard",
      "Do you wish to proceed?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Proceed",
          onPress: () => {
            restart();
            navigation.navigate("Dashboard");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleRestartCPRPress = () => {
    Alert.alert(
      "Restart CPR Training",
      "Are you sure you want to restart? Note that your progress will reset",
      [
        {
          text: "Nevermind",
          style: "cancel",
        },
        {
          text: "Yes, please",
          onPress: restart,
        },
      ],
      { cancelable: false }
    );
  };

  const restart = async () => {
    setTimer(0);
    setTrainingActive(true);
    try {
      await storeObjectData("elapsedTime", 0);
    } catch (error) {
      console.error("Error resetting elapsed time:", error);
    }
    const url = "http://192.168.74.2:5000/restart";
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log("CPR Restarted Successfully");
      } else {
        console.error("Failed to restart CPR");
      }
    } catch (error) {
      console.error("Error restarting CPR:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pressure Reached!":
        return { color: "#8fbc8f" };
      case "Too Much Pressure!!!!":
        return { color: "#cd5c5c" };
      case "Ready To Pump!":
        return { color: "#ff69b4" };
      default:
        return { color: "#000000" };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perform Infant CPR!</Text>
      <Text style={styles.timer}>⏱️ Timer: {formatTime(timer)}</Text>
      <View style={styles.roundedContainer}>
        {/** Current count of cycles, compressions, and rescue breaths */}
        <Text style={styles.text}>⭕ Cycles: {cyclesCount}</Text>
        <Text style={styles.text}>❤️‍🩹 Compressions: {compressionCount}</Text>
        <Text style={styles.text}>🫁 Rescue Breaths: {rescueBreathCount}</Text>

        {/** Pumping heart component **/}
        {/** We pass data.realtime_pressure to the PumpingHeart component */}
        <PumpingHeart pressure={data.realtime_pressure} />
        {/* <Text style={styles.text}>
          Detected Pressure: {data.realtime_pressure} PSI
        </Text>         */}
        <View style={styles.statusContainer}>
          <Text style={[styles.text, styles.statusText]}>PRESSURE STATUS</Text>
          <View style={styles.thresholdMessageContainer}>
            <Text
              style={[
                styles.thresholdMessageText,
                getStatusColor(thresholdMessage),
              ]}
            >
              {thresholdMessage}
            </Text>
          </View>

          {/* Button to navigate to results - REMOVE */}
          {/* <TouchableOpacity style={styles.checkResultsButton} onPress={handleCheckResultsPress}>
            <Text style={styles.checkResultsButtonText}>Check Results</Text>
          </TouchableOpacity> */}
        </View>

        {/** Rescue Breath Indicator */}
        {/** We pass data.status to the RescueBreathIndicator component */}
        <RescueBreathIndicator status={data.status} />
        {rescueBreathReady ? (
          <Text style={styles.text}>Start Rescue Breaths!</Text>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToDashboardPress}
        >
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleRestartCPRPress}
        >
          <Text style={styles.resetButtonText}>Restart CPR Training</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCE4EC",
  },
  roundedContainer: {
    width: "90%",
    height: "70%",
    backgroundColor: "#FFD1DC",
    borderRadius: 20,
    borderWidth: 4,
    borderStyle: "dashed",
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginVertical: 8,
    fontSize: 18,
    color: "black",
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 15,
  },
  statusText: {
    fontSize: 17.5,
    fontWeight: "bold",
    marginBottom: 10,
  },
  thresholdMessageContainer: {
    backgroundColor: "lavender",
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "dotted",
    borderColor: "#66B3FF",
    marginTop: 5,
  },
  thresholdMessageText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FF69B4",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  checkResultsButton: {
    backgroundColor: "#FF7FAA",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 15,
  },
  checkResultsButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#FF7FAA",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 10,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF7FAA",
  },
  resetButton: {
    backgroundColor: "#FF7FAA",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 10,
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF7FAA",
  },
});

export default MainCPR;
