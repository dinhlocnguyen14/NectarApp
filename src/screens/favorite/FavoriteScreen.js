import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const favorites = [
  {
    id: "1",
    name: "Sprite Can",
    description: "325ml, Price",
    price: "$1.50",
    image: require("../../../assets/images/sprite.png"),
  },
  {
    id: "2",
    name: "Diet Coke",
    description: "355ml, Price",
    price: "$1.99",
    image: require("../../../assets/images/coke.png"),
  },
  {
    id: "3",
    name: "Apple & Grape Juice",
    description: "2L, Price",
    price: "$15.50",
    image: require("../../../assets/images/juice.png"),
  },
  {
    id: "4",
    name: "Coca Cola Can",
    description: "325ml, Price",
    price: "$4.99",
    image: require("../../../assets/images/coca.png"),
  },
  {
    id: "5",
    name: "Pepsi Can",
    description: "330ml, Price",
    price: "$4.99",
    image: require("../../../assets/images/pessi.png"),
  },
];

const FavoriteScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Ionicons name="chevron-forward" size={20} color="#181725" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add All To Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#181725",
  },
  listContent: {
    padding: 20,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#181725",
  },
  itemDescription: {
    fontSize: 14,
    color: "#7C7C7C",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#181725",
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#E2E2E2",
  },
  addButton: {
    backgroundColor: "#53B175",
    margin: 20,
    height: 67,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default FavoriteScreen;
