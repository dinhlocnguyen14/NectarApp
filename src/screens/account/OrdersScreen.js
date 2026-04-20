import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OrderContext } from "../../context/OrderContext";
import { useNavigation } from "@react-navigation/native";

const OrdersScreen = () => {
  const { orders } = useContext(OrderContext);
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id.slice(-6)}</Text>
        <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
      </View>
      
      <View style={styles.itemsList}>
        {item.items.map((product, index) => (
          <Text key={index} style={styles.itemText}>
            {product.quantity}x {product.name}
          </Text>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalAmount}>${item.total}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color="#E2E2E2" />
          <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#181725",
  },
  backButton: {
    padding: 5,
  },
  listContent: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F3F2",
    paddingBottom: 10,
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#181725",
  },
  orderDate: {
    fontSize: 12,
    color: "#7C7C7C",
  },
  itemsList: {
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
    color: "#181725",
    marginBottom: 5,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F2F3F2",
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 14,
    color: "#7C7C7C",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#53B175",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#7C7C7C",
    textAlign: "center",
    marginTop: 20,
  },
});

export default OrdersScreen;
