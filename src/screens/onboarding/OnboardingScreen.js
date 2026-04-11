import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function OnboardingScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../../../assets/images/bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require("../../../assets/images/logo-white.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Welcome{"\n"}to our store</Text>

        <Text style={styles.subtitle}>
          Get your groceries in as fast as one hour
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 54,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: "contain",
  },

  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: "#eee",
    marginTop: 60,
    marginBottom: 25,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#59B17A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
