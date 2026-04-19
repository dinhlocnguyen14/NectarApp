import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { products } from "../../data/data";

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#181725" />
          <TextInput
            style={styles.input}
            placeholder="Search Store"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color="#7C7C7C" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => navigation.navigate("Filter")}
        >
          <Ionicons name="options-outline" size={24} color="#181725" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <Text style={{ color: "#7C7C7C" }}>No products found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderRadius: 15,
    paddingHorizontal: 12,
    height: 50,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    color: "#181725",
    fontWeight: "600",
  },
  filterButton: {
    marginLeft: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#181725",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "#7C7C7C",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#181725",
  },
  addButton: {
    backgroundColor: "#53B175",
    width: 45,
    height: 45,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchScreen;
