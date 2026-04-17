import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const ExploreScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const categories = [
    {
      id: 1,
      name: "Fresh Fruits & Vegetable",
      image: require("../../../assets/images/vegetable.png"),
      backgroundColor: "#E8F5E9",
      borderColor: "#53B175",
    },
    {
      id: 2,
      name: "Cooking Oil & Ghee",
      image: require("../../../assets/images/cooking-oil.png"),
      backgroundColor: "#FFF3E0",
      borderColor: "#FF9800",
    },
    {
      id: 3,
      name: "Meat & Fish",
      image: require("../../../assets/images/mealFish.png"),
      backgroundColor: "#FFEBEE",
      borderColor: "#E91E63",
    },
    {
      id: 4,
      name: "Bakery & Snacks",
      image: require("../../../assets/images/bakery.png"),
      backgroundColor: "#F3E5F5",
      borderColor: "#9C27B0",
    },
    {
      id: 5,
      name: "Dairy & Eggs",
      image: require("../../../assets/images/milk.png"),
      backgroundColor: "#FFFDE7",
      borderColor: "#FBC02D",
    },
    {
      id: 6,
      name: "Beverages",
      image: require("../../../assets/images/beverages.png"),
      backgroundColor: "#E1F5FE",
      borderColor: "#03A9F4",
    },
    {
      id: 7,
      name: "Dairy & Eggs",
      image: require("../../../assets/images/milk.png"),
      backgroundColor: "#FFFDE7",
      borderColor: "#9d1ca2",
    },
    {
      id: 8,
      name: "Beverages",
      image: require("../../../assets/images/beverages.png"),
      backgroundColor: "#E1F5FE",
      borderColor: "#53b91d",
    },
  ];

  const renderCategoryCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        {
          backgroundColor: item.backgroundColor,
          borderColor: item.borderColor,
        },
      ]}
      onPress={() => {
        if (item.name === "Beverages") {
          navigation.navigate("Beverages");
        }
      }}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Find Products</Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Store"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categories */}
        <FlatList
          data={categories}
          renderItem={renderCategoryCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
        />

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <FontAwesome name="shopping-bag" size={24} color="#999" />
          <Text style={styles.navText}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#53B175" />
          <Text style={[styles.navText, { color: "#53B175" }]}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="shopping-cart" size={24} color="#999" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="heart-o" size={24} color="#999" />
          <Text style={styles.navText}>Favourites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="user" size={24} color="#999" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },

  searchContainer: {
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },

  searchInput: { flex: 1, marginLeft: 8 },

  row: { justifyContent: "space-between" },

  categoryCard: {
    flex: 1,
    height: 140,
    borderRadius: 12,
    borderWidth: 2,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  categoryImage: { width: 80, height: 80 },

  categoryName: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  navItem: { alignItems: "center" },

  navText: { fontSize: 11, color: "#999" },
});
