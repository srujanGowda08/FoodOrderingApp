// components/CartItem.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
            <Ionicons name="trash-outline" size={24} color="#ff4444" />
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>
          ₹{(item.price * item.quantity).toFixed(2)}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={handleDecrement}
            style={styles.quantityButton}
          >
            <Ionicons name="remove-circle-outline" size={24} color="#2ecc71" />
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.quantityButton}
          >
            <Ionicons name="add-circle-outline" size={24} color="#2ecc71" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    color: "#2ecc71",
    fontWeight: "600",
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    padding: 4,
  },
  quantity: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: "center",
  },
  removeButton: {
    padding: 4,
  },
});

export default CartItem;
