import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const drinks = [
  {
    id: "1",
    name: "Diet Coke",
    size: "355ml",
    price: "$1.99",
    image: require("../../../assets/images/coke.png"),
  },
  {
    id: "2",
    name: "Sprite",
    size: "325ml",
    price: "$1.50",
    image: require("../../../assets/images/sprite.png"),
  },
  {
    id: "3",
    name: "Orange Juice",
    size: "330ml",
    price: "$1.25",
    image: require("../../../assets/images/orangeJuice.png"),
  },
  {
    id: "4",
    name: "Pepsi",
    size: "330ml",
    price: "$1.25",
    image: require("../../../assets/images/pessi.png"),
  },
  {
    id: "5",
    name: "Coca-Cola",
    size: "330ml",
    price: "$1.25",
    image: require("../../../assets/images/coca.png"),
  },
  {
    id: "6",
    name: "Juice",
    size: "330ml",
    price: "$1.25",
    image: require("../../../assets/images/juice.png"),
  },
];

const BeveragesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.size}>{item.size}</Text>

      <View style={styles.row}>
        <Text style={styles.price}>{item.price}</Text>

        <TouchableOpacity style={styles.btn}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Beverages</Text>

        <Ionicons name="options-outline" size={22} />
      </View>

      <FlatList
        data={drinks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
};

export default BeveragesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7F7" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 30,
  },

  title: { fontSize: 18, fontWeight: "600" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    width: "48%",
    marginBottom: 12,
  },

  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },

  name: { fontWeight: "600", marginTop: 8 },

  size: { color: "#888", fontSize: 12 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  price: { fontWeight: "bold" },

  btn: {
    backgroundColor: "#53B175",
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
