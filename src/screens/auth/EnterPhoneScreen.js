import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function EnterPhoneScreen() {
  const navigation = useNavigation();

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const validatePhone = () => {
    const regex = /^[0-9]{9,11}$/;

    if (!regex.test(phone)) {
      setError("Số điện thoại không hợp lệ");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validatePhone()) {
      console.log("Phone OK:", phone);
      navigation.navigate("OTP");
    }
  };

  return (
    <View style={styles.container}>
      {/* back */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Enter your mobile number</Text>

      <Text style={styles.label}>Mobile Number</Text>

      <View style={styles.inputRow}>
        <Image
          source={require("../../../assets/images/flag.png")}
          style={styles.flag}
        />
        <Text style={styles.code}>+880</Text>

        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.divider} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.fab} onPress={handleSubmit}>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  back: {
    fontSize: 24,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 30,
  },

  label: {
    color: "#999",
    marginBottom: 10,
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
    marginTop: 10,
  },

  error: {
    color: "red",
    marginTop: 10,
  },
  backBtn: {
    marginBottom: 20,
    marginTop: 20,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#59B17A",
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    color: "#fff",
    fontSize: 30,
  },
});
