import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function OTPScreen() {
  const navigation = useNavigation();

  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (!/^[0-9]?$/.test(text)) return;

    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const finalCode = code.join("");

    if (finalCode.length < 4) {
      alert("Vui lòng nhập đủ mã");
      return;
    }

    console.log("OTP:", finalCode);
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

      <Text style={styles.title}>Enter your 4-digit code</Text>

      <Text style={styles.label}>Code</Text>

      {/*input*/}
      <View style={styles.otpRow}>
        {code.map((item, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={item}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <View style={styles.divider} />

      {/* resend */}
      <TouchableOpacity>
        <Text style={styles.resend}>Resend Code</Text>
      </TouchableOpacity>

      {/* button */}
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

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 30,
  },

  label: {
    color: "#999",
    marginBottom: 10,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  otpInput: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 20,
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginTop: 10,
  },
  backBtn: {
    marginBottom: 20,
    marginTop: 20,
  },
  resend: {
    color: "#59B17A",
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
