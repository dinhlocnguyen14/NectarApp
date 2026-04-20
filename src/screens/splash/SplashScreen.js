import { View, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import storageService from "../../services/storageService";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await storageService.get("userToken");
        if (token) {
          navigation.replace("Home");
        } else {
          navigation.replace("Onboarding");
        }
      } catch (error) {
        console.error("Splash check error:", error);
        navigation.replace("Onboarding");
      }
    };

    const timer = setTimeout(() => {
      checkLoginStatus();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#59B17A",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
  },
});
