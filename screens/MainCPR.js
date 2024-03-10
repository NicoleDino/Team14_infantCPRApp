import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import io from "socket.io-client";

// Gamified components
import PumpingHeart from "../components/PumpingHeart.jsx";
import RescueBreathIndicator from "../components/RescueBreathIndicator.jsx";

// For storing data
import { storeObjectData } from "../utils/storage.js";

function MainCPR({ navigation }) {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState({
    flow_rate: 0,
    status: "None",
    realtime_pressure: 0,
  });
  const [thresholdMessage, setThresholdMessage] = useState("None");
  const [rescueBreathReady, setRescueBreathReady] = useState(false);

  // Gets the current count of compressions and rescue breaths
  const [cyclesCount, setCyclesCount] = useState(0);
  const [compressionCount, setCompressionCount] = useState(0);
  const [rescueBreathCount, setRescueBreathCount] = useState(0);

  useEffect(() => {
    const newSocket = io("http://192.168.68.106:5000", {
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
          }
          catch (err) {
            console.log("Error saving data: ", err);
          }
        }
      });
    }
  }, [socket]);

  const handleCheckResultsPress = () => {
    navigation.navigate("Results");
  };

  const handleBackToDashboardPress = () => {
    navigation.navigate("Dashboard");
  };

  const restart = async () => {
    const url = "http://192.168.68.106:5000/restart";
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perform Infant CPR!</Text>
      <View style={styles.roundedContainer}>
        {/** Current count of cycles, compressions, and rescue breaths */}
        <Text style={styles.text}>⭕  Cycles: {cyclesCount}</Text>
        <Text style={styles.text}>❤️‍🩹  Compressions: {compressionCount}</Text>
        <Text style={styles.text}>🫁  Rescue Breaths: {rescueBreathCount}</Text>

        {/** Pumping heart component **/}
        {/** We pass data.realtime_pressure to the PumpingHeart component */}
        <PumpingHeart pressure={data.realtime_pressure} />
        <Text style={styles.text}>
          Detected Pressure: {data.realtime_pressure} PSI
        </Text>
        <Text style={styles.text}>Pressure Status: {thresholdMessage}</Text>

        {/** Rescue Breath Indicator */}
        {/** We pass data.status to the RescueBreathIndicator component */}
        <RescueBreathIndicator status={data.status} />
        {rescueBreathReady ? (
          <Text style={styles.text}>Start Rescue Breaths!</Text>
        ) : (
          <></>
        )}

        {/* <Text style={styles.text}>Flow Rate: {data.flow_rate} mL/s</Text>
        <Text style={styles.text}>Flow Status: {data.status}</Text> */}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackToDashboardPress}>
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={restart}>
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
});

export default MainCPR;
