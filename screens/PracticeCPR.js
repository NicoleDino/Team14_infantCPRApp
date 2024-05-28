// PracticeCPR.js

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import io from "socket.io-client";

// Gamified components
import PumpingHeart from "../components/PumpingHeart.jsx";
import RescueBreathIndicator from "../components/RescueBreathIndicator.jsx";

function PracticeCPR({ navigation }) {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState({
    flow_rate: 0,
    status: "None",
    realtime_pressure: 0,
  });
  const [thresholdMessage, setThresholdMessage] = useState("None");
  const [rescueBreathReady, setRescueBreathReady] = useState(false);

  // Timer state
  const [timer, setTimer] = useState(0); // Timer in seconds

  // Gets the current count of compressions and rescue breaths
  const [cyclesCount, setCyclesCount] = useState(0);
  const [compressionCount, setCompressionCount] = useState(0);
  const [rescueBreathCount, setRescueBreathCount] = useState(0);

  const [trainingActive, setTrainingActive] = useState(true);

  useEffect(() => {
    const newSocket = io("http://192.168.38.2:5000", {
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
    }
  }, [socket]);

  useEffect(() => {
    if (socket != null && trainingActive) {
      // Timer interval
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1); // Increment the timer value
      }, 1000);

      // Cleanup interval on component unmount or when training ends
      return () => clearInterval(interval);
    }
  }, [socket, trainingActive]);

  // Function to format time in "2:00" format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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
    setTrainingActive(true); // Restart training
    const url = "http://192.168.38.2:5000/restart";
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
        </Text> */}
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
          <Text style={styles.resetButtonText}>Restart CPR Practice</Text>
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
    backgroundColor: "white",
  },
  roundedContainer: {
    width: "90%",
    height: "70%",
    backgroundColor: "#FCE4EC",
    borderRadius: 20,
    borderWidth: 4,
    borderStyle: "dashed",
    borderColor: "#FF7FAA",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF7FAA",
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF7FAA",
  },
});

export default PracticeCPR;
