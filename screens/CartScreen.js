import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function CartScreen({ navigation }) {
  const { cart, getTotal } = useCart();

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ₹{getTotal().toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("OrderSummary")}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  checkoutButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
