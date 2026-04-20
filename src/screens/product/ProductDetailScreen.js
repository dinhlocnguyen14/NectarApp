import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CartContext } from "../../context/CartContext";

const ProductDetailScreen = ({ navigation, route }) => {
  const { addToCart } = useContext(CartContext);
  const { product } = route.params || {
    product: {
      id: "apple_default",
      name: "Natural Red Apple",
      weight: "1kg",
      price: "$4.99",
      image: require("../../../assets/images/apple.png"),
      rating: 5,
      description:
        "Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.",
    },
  };

  const [quantity, setQuantity] = useState(1);
  const [showDetailSection, setShowDetailSection] = useState(true);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onAddToBasket = () => {
    addToCart(product, quantity);
    navigation.navigate("Home"); // Navigate to Home which contains the TabNavigator, or directly to Cart
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-social" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
          <View style={styles.imageIndicators}>
            <View style={[styles.indicator, styles.activeIndicator]} />
            <View style={styles.indicator} />
            <View style={styles.indicator} />
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleSection}>
            <View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productWeight}>{product.weight}, Price</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={28} color="#53B175" />
            </TouchableOpacity>
          </View>

          {/* Quantity and Price */}
          <View style={styles.quantityPriceSection}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={handleDecrement}
              >
                <Text style={styles.quantityBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={handleIncrement}
              >
                <Ionicons name="add" size={20} color="#53B175" />
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>{product.price}</Text>
          </View>

          {/* Product Detail Section */}
          <TouchableOpacity
            style={styles.detailHeader}
            onPress={() => setShowDetailSection(!showDetailSection)}
          >
            <Text style={styles.detailTitle}>Product Detail</Text>
            <Ionicons
              name={showDetailSection ? "chevron-up" : "chevron-down"}
              size={24}
              color="#999"
            />
          </TouchableOpacity>

          {showDetailSection && (
            <Text style={styles.detailDescription}>
              {product.description}
            </Text>
          )}

          {/* Nutritions Section */}
          <TouchableOpacity style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Nutritions</Text>
              <Text style={styles.nutritionValue}>100gr</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          {/* Review Section */}
          <TouchableOpacity style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Review</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text key={star} style={styles.star}>
                    ★
                  </Text>
                ))}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <View style={styles.spacer} />
        </View>
      </ScrollView>
      {/* Add To Basket Button */}
      <TouchableOpacity style={styles.addButton} onPress={onAddToBasket}>
        <Text style={styles.addButtonText}>Add To Basket</Text>
      </TouchableOpacity>
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
    paddingTop: 12,
    marginTop: 30,
    paddingBottom: 16,
  },
  imageContainer: {
    backgroundColor: "#F2F3F2",
    marginHorizontal: 16,
    borderRadius: 12,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  imageIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    position: "absolute",
    bottom: 12,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DDD",
  },
  activeIndicator: {
    backgroundColor: "#53B175",
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  productWeight: {
    fontSize: 14,
    color: "#999",
  },
  quantityPriceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderRadius: 8,
    paddingHorizontal: 8,
    gap: 12,
  },
  quantityBtn: {
    width: 36,
    height: 36,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  quantityBtnText: {
    fontSize: 20,
    color: "#53B175",
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    minWidth: 30,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    marginBottom: 12,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  detailDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 12,
    color: "#999",
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 2,
  },
  star: {
    fontSize: 16,
    color: "#FF6B35",
  },
  spacer: {
    height: 100,
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    backgroundColor: "#53B175",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProductDetailScreen;
