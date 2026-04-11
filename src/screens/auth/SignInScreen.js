import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function SignInScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/logo-bg.png")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>Get your groceries{"\n"}with nectar</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EnterPhone")}>
          <View pointerEvents="none">
            <View style={styles.inputRow}>
              <Image
                source={require("../../../assets/images/flag.png")}
                style={styles.flag}
              />
              <Text style={styles.code}>+880</Text>

              <TextInput
                placeholder="Phone number"
                style={styles.input}
                editable={false}
              />
            </View>

            <View style={styles.divider} />
          </View>
        </TouchableOpacity>

        <Text style={styles.orText}>Or connect with social media</Text>

        {/* google */}
        <TouchableOpacity style={[styles.socialBtn, styles.google]}>
          <View style={styles.row}>
            <AntDesign name="google" size={20} color="#fff" />
            <Text style={styles.socialText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        {/* facebook */}
        <TouchableOpacity style={[styles.socialBtn, styles.facebook]}>
          <View style={styles.row}>
            <FontAwesome name="facebook" size={20} color="#fff" />
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </View>
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
    height: 350,
  },

  content: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 25,
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
    color: "#000",
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },

  orText: {
    textAlign: "center",
    color: "#999",
    marginVertical: 20,
  },

  socialBtn: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },

  google: {
    backgroundColor: "#5383EC",
  },

  facebook: {
    backgroundColor: "#4A66AC",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  socialText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 10,
  },
});
