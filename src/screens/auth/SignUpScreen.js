import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import storageService from "../../services/storageService";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const EXPIRE_IN = 24 * 60 * 60 * 1000; // 24 hours
      await storageService.save("userName", username, EXPIRE_IN);
      await storageService.save("userEmail", email, EXPIRE_IN);
      await storageService.save("userToken", "dummy-auth-token", EXPIRE_IN);
      navigation.replace("Home");
    } catch (e) {
      console.error("Failed to sign up", e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/Group.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your credentials to continue</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.policy}>
        By continuing you agree to our{" "}
        <Text style={{ color: "#59B17A" }}>Terms of Service</Text> and{" "}
        <Text style={{ color: "#59B17A" }}>Privacy Policy</Text>.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Already have an account?{" "}
        <Text
          style={{ color: "#59B17A" }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "space-around",
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
