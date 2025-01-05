// screens/OrderSummaryScreen.js

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";

export default function OrderSummaryScreen({ navigation }) {
  const { cart, getTotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const submitOrder = async () => {
    setSubmitting(true);
    try {
      const db = getFirestore();
      await addDoc(collection(db, "orders"), {
        items: cart,
        total: getTotal(),
        timestamp: new Date().toISOString(),
        status: "pending",
      });

      // Clear the cart after order placement
      clearCart();

      Alert.alert("Success", "Your order has been placed successfully!", [
        {
          text: "OK",
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Menu" }],
            }),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      {cart.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text>
            {item.name} x {item.quantity}
          </Text>
          <Text>₹{(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>₹{getTotal().toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={submitOrder}
        disabled={submitting}
      >
        <Text style={styles.submitText}>
          {submitting ? "Placing Order..." : "Place Order"}
        </Text>
      </TouchableOpacity>
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
    color: "#666",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  checkoutButton: {
    backgroundColor: "#2ecc71",
    padding: 16,
    borderRadius: 8,
  },
  checkoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: "#eee",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  submitButton: {
    backgroundColor: "#2ecc71",
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
