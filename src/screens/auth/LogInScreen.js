import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import storageService from "../../services/storageService";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { refreshCart } = useContext(CartContext);
  const { refreshOrders } = useContext(OrderContext);

  const handleLogin = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    try {
      const EXPIRE_IN = 24 * 60 * 60 * 1000; // 24 hours
      const derivedName = email.split("@")[0];
      
      await storageService.save("userToken", "dummy-auth-token", EXPIRE_IN);
      await storageService.save("userEmail", email, EXPIRE_IN);
      await storageService.save("userName", derivedName, EXPIRE_IN);
      
      // Refresh contexts with new user data
      await refreshCart();
      await refreshOrders();
      
      navigation.navigate("Home");
    } catch (e) {
      console.error("Failed to save token", e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/Group.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter your email and password</Text>

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

      <Text style={styles.forgot}>Forgot Password?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
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
