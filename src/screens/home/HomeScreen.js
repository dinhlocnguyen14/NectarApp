import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../../context/CartContext";
import useStorage from "../../hooks/useStorage";
import { ProductSkeleton } from "../../components/ProductSkeleton";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);
  const [searchText, setSearchText] = useState("");
  const { value: userEmail, loading: storageLoading } = useStorage("userEmail");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Location and Icons */}
        <Image
          source={require("../../../assets/images/Group.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.locationSection}>
          <Ionicons name="location" size={20} color="#53B175" />
          <Text style={styles.locationText}>Dhaka, Banassre</Text>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Store"
            placeholderTextColor="#999"
            editable={false}
          />
        </TouchableOpacity>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={require("../../../assets/images/banner (1).png")}
            style={styles.bannerBackground}
            resizeMode="cover"
          ></ImageBackground>
        </View>

        {/* Exclusive Offer Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exclusive Offer</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.productScroll}
        >
          {isLoading ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : (
            <>
              {/* Product Card 1 */}
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate("ProductDetail", {
                    product: {
                      name: "Organic Bananas",
                      weight: "7pcs",
                      price: "$4.99",
                      image: require("../../../assets/images/banana.png"),
                    },
                  })
                }
              >
                <Image
                  source={require("../../../assets/images/banana.png")}
                  style={[styles.productImage]}
                />
                <Text style={styles.productName}>Organic Bananas</Text>
                <Text style={styles.productDescription}>7pcs, Priceg</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>$4.99</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      addToCart({
                        id: "banana_1",
                        name: "Organic Bananas",
                        description: "7pcs, Price",
                        price: 4.99,
                        image: require("../../../assets/images/banana.png"),
                      })
                    }
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {/* Product Card 2 */}
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate("ProductDetail", {
                    product: {
                      name: "Red Apple",
                      weight: "1kg",
                      price: "$4.99",
                      image: require("../../../assets/images/apple.png"),
                    },
                  })
                }
              >
                <Image
                  source={require("../../../assets/images/apple.png")}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>Red Apple</Text>
                <Text style={styles.productDescription}>1kg, Priceg</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>$4.99</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      addToCart({
                        id: "apple_1",
                        name: "Red Apple",
                        description: "1kg, Price",
                        price: 4.99,
                        image: require("../../../assets/images/apple.png"),
                      })
                    }
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {/* Product Card 2 */}
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate("ProductDetail", {
                    product: {
                      name: "Red Apple",
                      weight: "1kg",
                      price: "$4.99",
                      image: require("../../../assets/images/apple.png"),
                    },
                  })
                }
              >
                <Image
                  source={require("../../../assets/images/coca.png")}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>CoCa</Text>
                <Text style={styles.productDescription}>1L, Priceg</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>$4.99</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      addToCart({
                        id: "coca_1",
                        name: "CoCa",
                        description: "1L, Price",
                        price: 4.99,
                        image: require("../../../assets/images/coca.png"),
                      })
                    }
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>

        {/* Best Selling Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.productScroll}
        >
          {isLoading ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : (
            <>
              {/* Product Card 3 */}
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate("ProductDetail", {
                    product: {
                      name: "Bell Pepper",
                      weight: "1kg",
                      price: "$3.99",
                      image: require("../../../assets/images/banana.png"),
                    },
                  })
                }
              >
                <Image
                  source={require("../../../assets/images/banana.png")}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>Bell Pepper</Text>
                <Text style={styles.productDescription}>1kg, Priceg</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>$3.99</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      addToCart({
                        id: "pepper_1",
                        name: "Bell Pepper",
                        description: "1kg, Price",
                        price: 3.99,
                        image: require("../../../assets/images/banana.png"),
                      })
                    }
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {/* Product Card 4 */}
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate("ProductDetail", {
                    product: {
                      name: "Spinach",
                      weight: "300g",
                      price: "$2.99",
                      image: require("../../../assets/images/apple.png"),
                    },
                  })
                }
              >
                <Image
                  source={require("../../../assets/images/apple.png")}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>Spinach</Text>
                <Text style={styles.productDescription}>300g, Priceg</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>$2.99</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      addToCart({
                        id: "spinach_1",
                        name: "Spinach",
                        description: "300g, Price",
                        price: 2.99,
                        image: require("../../../assets/images/apple.png"),
                      })
                    }
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>

        {/* Groceries Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Groceries</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          {/* Pulses Category */}
          <TouchableOpacity style={[styles.categoryCard, styles.pulsesCard]}>
            <Image
              source={require("../../../assets/images/pulses.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>Pulses</Text>
          </TouchableOpacity>

          {/* Rice Category */}
          <TouchableOpacity style={[styles.categoryCard, styles.riceCard]}>
            <Image
              source={require("../../../assets/images/rice.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>Rice</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.productScroll}
        >
          {isLoading ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : (
            <>
              {/* Groceries Product 1 */}
              <View style={styles.productCard}>
                <Image
                  source={require("../../../assets/images/beef.png")}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>Beef Bone</Text>
                <Text style={styles.productDescription}>1kg, Priceg</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>$4.99</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      addToCart({
                        id: "beef_1",
                        name: "Beef Bone",
                        description: "1kg, Price",
                        price: 4.99,
                        image: require("../../../assets/images/beef.png"),
                      })
                    }
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Groceries Product 2 */}
              <View style={styles.productCard}>
                <Image
                  source={require("../../../assets/images/chicken.png")}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>Broiler Chicken</Text>
                <Text style={styles.productDescription}>1kg, Priceg</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>$4.99</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      addToCart({
                        id: "chicken_1",
                        name: "Broiler Chicken",
                        description: "1kg, Price",
                        price: 4.99,
                        image: require("../../../assets/images/chicken.png"),
                      })
                    }
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </ScrollView>
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 16,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginTop: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  bannerContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    height: 120,
    backgroundColor: "#F0F9E8",
  },
  bannerBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  bannerOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingLeft: 20,
    width: "50%",
  },
  bannerContent: {
    justifyContent: "center",
  },
  bannerImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  bannerText: {
    flex: 1,
    paddingLeft: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
    lineHeight: 24,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: "#53B175",
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  seeAll: {
    fontSize: 14,
    color: "#53B175",
    fontWeight: "600",
  },
  categoriesContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    height: 100,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pulsesCard: {
    backgroundColor: "#F1E5D3",
  },
  riceCard: {
    backgroundColor: "#E8F5E9",
  },
  categoryImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    position: "absolute",
    top: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginTop: 55,
  },
  productScroll: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  productCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: "#F8F9F8",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  productFooter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  addButton: {
    backgroundColor: "#53B175",
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  spacer: {
    height: 20,
  },
});

export default HomeScreen;
