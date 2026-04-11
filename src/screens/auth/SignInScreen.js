import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/logo-bg.png")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>Get your groceries{"\n"}with nectar</Text>

        {/* Phone input */}
        <View style={styles.inputRow}>
          <Image
            source={require("../../../assets/images/flag.png")}
            style={styles.flag}
          />
          <Text style={styles.code}>+880</Text>
          <TextInput
            placeholder="Phone number"
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.orText}>Or connect with social media</Text>

        {/* Google */}
        <TouchableOpacity style={[styles.socialBtn, styles.google]}>
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity style={[styles.socialBtn, styles.facebook]}>
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    height: 300,
  },

  content: {
    flex: 1,
    padding: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  flag: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  code: {
    marginRight: 10,
    fontSize: 16,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },

  orText: {
    textAlign: "center",
    color: "#999",
    marginTop: 30,
    marginVertical: 20,
  },

  socialBtn: {
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
  },

  google: {
    backgroundColor: "#5383EC",
  },

  facebook: {
    backgroundColor: "#4A66AC",
  },

  socialText: {
    color: "#fff",
    fontWeight: "600",
  },
});
