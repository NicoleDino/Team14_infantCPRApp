import React, { useState, useEffect } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";

function PumpingHeart({ pressure }) {
  const [currentAnimation, setCurrentAnimation] = useState(-1);
  const [prevPressure, setPrevPressure] = useState(0);
  const [scaleValue] = useState(new Animated.Value(1));

  /**
   * Checks if the current pressure has changed, whether larger or smaller.
   * If pressure is larger than the previous pressure, the image(heart) will scale up,
   * else it will scale down back to 1 (or the default scale).
   *
   * It also checks if the current animation is already playing. This is to avoid
   * repeated calls of the start() function.
   */
  
  useEffect(() => {
    if (pressure < prevPressure && currentAnimation != 0) {
      /** Animation timing that scales the image up to 2 */
      setCurrentAnimation(0);
      Animated.timing(scaleValue, {
        toValue: 2,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else if (pressure > prevPressure && currentAnimation != 1) {
      /** Animation timing that scales the image back to 1 */
      setCurrentAnimation(1);
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 700,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }

    /**Assigns the current pressure to the previous pressure */
    setPrevPressure(pressure);
  }, [pressure]);
  

  return (
    <>
      <View style={styles.container}>
        <View style={styles.heartContainer}>
          <Animated.View
            style={[styles.heart, { transform: [{ scale: scaleValue }] }]}
          >
            <Image
              style={styles.image}
              source={require("../assets/heart.png")}
            />
          </Animated.View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  heartContainer: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  heart: {
    height: "100%",
    width: "100%",
  },
  image: {
    height: 100,
    width: 100,
  },
});

export default PumpingHeart;
