import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const navigation = useNavigation();

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      await addOrder(cartItems, totalPrice);
      await clearCart();
      Alert.alert(
        "Success",
        "Your order has been placed successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Orders"),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to place order. Please try again.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Ionicons name="close" size={20} color="#7C7C7C" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.itemFooter}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, -1)}
            >
              <Ionicons name="remove" size={20} color="#7C7C7C" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={[styles.quantityButton, styles.quantityAdd]}
              onPress={() => updateQuantity(item.id, 1)}
            >
              <Ionicons name="add" size={20} color="#53B175" />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.priceTag}>
            <Text style={styles.priceTagText}>${totalPrice}</Text>
          </View>
        </TouchableOpacity>
      )}
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
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  itemImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#181725",
  },
  itemDescription: {
    fontSize: 14,
    color: "#7C7C7C",
    marginVertical: 5,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 45,
    height: 45,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 15,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#181725",
  },
  separator: {
    height: 1,
    backgroundColor: "#E2E2E2",
  },
  checkoutButton: {
    backgroundColor: "#53B175",
    margin: 20,
    height: 67,
    borderRadius: 19,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  priceTag: {
    backgroundColor: "#489E67",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 10,
  },
  priceTagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#7C7C7C",
    fontWeight: "500",
  },
});

export default CartScreen;
