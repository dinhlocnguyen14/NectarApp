import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function SelectLocationScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/location.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Select Your Location</Text>

      <Text style={styles.subtitle}>
        Switch on your location to stay in tune with what’s happening in your
        area
      </Text>

      {/* Zone */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Your Zone</Text>
        <Text style={styles.value}>Banasree ▼</Text>
      </View>

      {/* Area */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Your Area</Text>
        <Text style={styles.placeholder}>Types of your area ▼</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginVertical: 10,
  },

  inputBox: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 10,
  },

  label: {
    color: "#999",
  },

  value: {
    marginTop: 5,
    fontSize: 16,
  },

  placeholder: {
    marginTop: 5,
    color: "#aaa",
  },

  button: {
    marginTop: 40,
    backgroundColor: "#59B17A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
