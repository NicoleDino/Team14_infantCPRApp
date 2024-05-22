import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";

function RescueBreathIndicator({ status }) {
  /** This displays the green light indicator */
  const greenLight = () => {
    return (
      <>
        <Image
          style={styles.image}
          source={require("../assets/green_light.png")}
        />
        <Image
          style={styles.image}
          source={require("../assets/gray_light.png")}
        />
      </>
    );
  };

  /** This displays the red light indicator */
  const redLight = () => {
    return (
      <>
        <Image
          style={styles.image}
          source={require("../assets/gray_light.png")}
        />
        <Image
          style={styles.image}
          source={require("../assets/red_light.png")}
        />
      </>
    );
  };

  /** Checks if the status is "HIT", then green light is up, else, red light is up */
  const renderLight = (status) => {
    if (status == "HIT") {
      return greenLight();
    } else {
      return redLight();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Rescue Breaths Indicator</Text>
        <View style={styles.lights}>{renderLight(status)}</View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  lights: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    gap: 16,
  },
  image: {
    height: 75,
    width: 75,
  },
  text: {
    fontSize: 14,
    color: "black",
  },
});

export default RescueBreathIndicator;
