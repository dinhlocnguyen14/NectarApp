import { View, Text, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function TextSplash({
  text = "Welcome",
  duration = 2000,
  onFinish,
}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // fade in
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // fade out sau delay
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish && onFinish();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000055",
    zIndex: 999,
  },

  text: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
});
