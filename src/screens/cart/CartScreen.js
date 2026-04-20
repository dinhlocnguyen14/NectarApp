import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const CartScreen = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setModalVisible(true);
  };

  const handlePlaceOrder = async () => {
    setModalVisible(false);
    try {
      await addOrder(cartItems, totalPrice);
      await clearCart();
      navigation.navigate("OrderSuccess");
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#181725" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <TouchableOpacity style={styles.modalRow}>
                <Text style={styles.modalRowLabel}>Delivery</Text>
                <View style={styles.modalRowRight}>
                  <Text style={styles.modalRowValue}>Select Method</Text>
                  <Ionicons name="chevron-forward" size={20} color="#181725" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalRow}>
                <Text style={styles.modalRowLabel}>Payment</Text>
                <View style={styles.modalRowRight}>
                  <View style={styles.mastercardLogo}>
                    <View style={styles.mcCircleRed} />
                    <View style={styles.mcCircleYellow} />
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#181725" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalRow}>
                <Text style={styles.modalRowLabel}>Promo Code</Text>
                <View style={styles.modalRowRight}>
                  <Text style={styles.modalRowValue}>Pick discount</Text>
                  <Ionicons name="chevron-forward" size={20} color="#181725" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalRow}>
                <Text style={styles.modalRowLabel}>Total Cost</Text>
                <View style={styles.modalRowRight}>
                  <Text style={styles.modalRowValue}>${totalPrice}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#181725" />
                </View>
              </TouchableOpacity>

              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By placing an order you agree to our{" "}
                  <Text style={styles.termsHighlight}>Terms</Text> And{" "}
                  <Text style={styles.termsHighlight}>Conditions</Text>
                </Text>
              </View>

              <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
                <Text style={styles.placeOrderText}>Place Order</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#181725",
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  modalRowLabel: {
    fontSize: 18,
    color: "#7C7C7C",
    fontWeight: "500",
  },
  modalRowRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalRowValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#181725",
    marginRight: 10,
  },
  termsContainer: {
    marginVertical: 20,
  },
  termsText: {
    fontSize: 14,
    color: "#7C7C7C",
    lineHeight: 20,
  },
  termsHighlight: {
    color: "#181725",
    fontWeight: "600",
  },
  placeOrderButton: {
    backgroundColor: "#53B175",
    height: 67,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  mastercardLogo: {
    flexDirection: "row",
    marginRight: 10,
    alignItems: "center",
  },
  mcCircleRed: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#EB001B",
    opacity: 0.8,
  },
  mcCircleYellow: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#F79E1B",
    marginLeft: -8,
    opacity: 0.8,
  },
});

export default CartScreen;
