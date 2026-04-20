import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AccountScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      const savedEmail = await AsyncStorage.getItem("userEmail");
      if (savedEmail) {
        setEmail(savedEmail);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userEmail");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (e) {
      console.error("Error during logout", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>User Name</Text>
          <Text style={styles.email}>{email || "No email"}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
    gap: 15,
  },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  name: { fontSize: 20, fontWeight: "bold" },
  email: { color: "#7C7C7C", fontSize: 16 },
  logoutBtn: {
    backgroundColor: "#F2F3F2",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    left: 20,
  },
  logoutText: { color: "#53B175", fontWeight: "bold", fontSize: 18 },
});

export default AccountScreen;
