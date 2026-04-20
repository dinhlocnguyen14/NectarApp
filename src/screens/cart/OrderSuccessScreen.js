import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OrderSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          {/* Decorative Confetti/Dots */}
          <View style={[styles.dot, styles.dotGreen, { top: 0, left: 60 }]} />
          <View style={[styles.dot, styles.dotOrange, { top: 20, right: 80 }]} />
          <View style={[styles.dot, styles.dotRed, { top: 40, left: 100 }]} />
          <View style={[styles.circleOutline, styles.circleOrange, { top: 100, left: 20 }]} />
          <View style={[styles.circleOutline, styles.circlePurple, { top: 140, right: 30 }]} />
          <View style={[styles.dot, styles.dotBlue, { bottom: 60, right: 100 }]} />
          <View style={[styles.dot, styles.dotGreenSmall, { bottom: 80, left: 120 }]} />
          <View style={[styles.circleOutline, styles.circleGreen, { bottom: 100, left: 40 }]} />

          {/* Main Success Icon */}
          <View style={styles.successOuterCircle}>
            <View style={styles.successInnerCircle}>
              <Ionicons name="checkmark" size={50} color="#fff" />
            </View>
          </View>
        </View>

        <Text style={styles.title}>Your Order has been accepted</Text>
        <Text style={styles.subtitle}>
          Your items have been placed and are on{"\n"}their way to being processed
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => navigation.navigate("Orders")}
        >
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backButtonText}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  illustrationContainer: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  successOuterCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#E2F6EA",
    alignItems: "center",
    justifyContent: "center",
  },
  successInnerCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#53B175",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#181725",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 35,
  },
  subtitle: {
    fontSize: 16,
    color: "#7C7C7C",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  footer: {
    padding: 25,
    paddingBottom: 40,
  },
  trackButton: {
    backgroundColor: "#53B175",
    height: 67,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  trackButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  backButton: {
    height: 67,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#181725",
  },
  // Decorative dots and circles
  dot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotGreen: { backgroundColor: "#53B175", width: 12, height: 12 },
  dotOrange: { backgroundColor: "#F79E1B", width: 8, height: 8 },
  dotRed: { backgroundColor: "#F3603F", width: 8, height: 8 },
  dotBlue: { backgroundColor: "#5383EC", width: 14, height: 14, borderRadius: 7 },
  dotGreenSmall: { backgroundColor: "#489E67", width: 6, height: 6, borderRadius: 3 },
  circleOutline: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: "transparent",
  },
  circleOrange: { borderColor: "#F79E1B" },
  circlePurple: { borderColor: "#B574F2" },
  circleGreen: { borderColor: "#489E67" },
});

export default OrderSuccessScreen;
