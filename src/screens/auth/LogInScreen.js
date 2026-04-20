import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/Group.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter your emails and password</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />

      <Text style={styles.forgot}>Forgot Password?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          try {
            await AsyncStorage.setItem("userToken", "dummy-auth-token");
            await AsyncStorage.setItem("userEmail", email);
            navigation.navigate("Home");
          } catch (e) {
            console.error("Failed to save token", e);
          }
        }}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Don’t have an account?{" "}
        <Text
          style={{ color: "#59B17A" }}
          onPress={() => navigation.navigate("SignUp")}
        >
          Signup
        </Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: "#fff",
  },

  logo: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginTop: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
  },

  subtitle: {
    color: "#777",
    marginBottom: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingVertical: 8,
  },

  forgot: {
    textAlign: "right",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#59B17A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  bottomText: {
    textAlign: "center",
    marginTop: 20,
  },

  policy: {
    fontSize: 12,
    color: "#777",
    marginBottom: 20,
  },
});
