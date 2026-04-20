import React, { createContext, useState, useEffect } from "react";
import storageService from "../services/storageService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await storageService.getCart();
      if (savedCart) {
        setCartItems(savedCart);
      }
    } catch (error) {
      console.error("Failed to load cart", error);
    }
  };

  const saveCart = async (items) => {
    try {
      await storageService.saveCart(items);
    } catch (error) {
      console.error("Failed to save cart", error);
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id || item.name === product.name);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map((item) =>
          (item.id === product.id || item.name === product.name)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Ensure the product has an ID if it doesn't
        const productId = product.id || Date.now().toString();
        // Convert price string like "$4.99" to number if necessary
        const priceNum = typeof product.price === 'string' 
          ? parseFloat(product.price.replace('$', '')) 
          : product.price;
        
        newItems = [...prevItems, { ...product, id: productId, price: priceNum, quantity }];
      }
      saveCart(newItems);
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== productId);
      saveCart(newItems);
      return newItems;
    });
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      saveCart(newItems);
      return newItems;
    });
  };

  const clearCart = async () => {
    try {
      setCartItems([]);
      await storageService.clearCart();
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
