import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import storageService from "../../services/storageService";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const AccountScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedEmail = await storageService.get("userEmail");
        if (savedEmail) {
          setEmail(savedEmail);
        }
      } catch (error) {
        console.error("Failed to load user email", error);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await storageService.remove("userToken");
      await storageService.remove("userEmail");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (e) {
      console.error("Error during logout", e);
    }
  };

  const AccountItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={24} color="#181725" />
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#181725" />
    </TouchableOpacity>
  );

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

      <ScrollView style={styles.menuContainer}>
        <AccountItem 
          icon="receipt-outline" 
          title="Orders" 
          onPress={() => navigation.navigate("Orders")} 
        />
        <AccountItem icon="card-outline" title="Payment Methods" />
        <AccountItem icon="location-outline" title="Delivery Address" />
        <AccountItem icon="notifications-outline" title="Notifications" />
        <AccountItem icon="help-circle-outline" title="Help" />
        <AccountItem icon="alert-circle-outline" title="About" />
      </ScrollView>

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
    marginBottom: 20,
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F3F2",
    paddingBottom: 20,
  },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  name: { fontSize: 20, fontWeight: "bold" },
  email: { color: "#7C7C7C", fontSize: 16 },
  menuContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F3F2",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#181725",
  },
  logoutBtn: {
    backgroundColor: "#F2F3F2",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: { color: "#53B175", fontWeight: "bold", fontSize: 18 },
});

export default AccountScreen;
