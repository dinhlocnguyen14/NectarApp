import React, { createContext, useState, useEffect } from "react";
import storageService from "../services/storageService";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const userEmail = await storageService.get("userEmail");
      const savedOrders = await storageService.getOrders();
      
      if (savedOrders && userEmail) {
        // Filter orders that belong to the current user
        const userOrders = savedOrders.filter(order => order.userEmail === userEmail);
        setOrders(userOrders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to load orders", error);
    }
  };

  const refreshOrders = async () => {
    await loadOrders();
  };

  const addOrder = async (items, total) => {
    const userEmail = await storageService.get("userEmail");
    
    const newOrder = {
      id: Date.now().toString(),
      items: [...items],
      total: total,
      date: new Date().toISOString(),
      userEmail: userEmail, // Associate order with user
    };

    // We still load all orders from storage to update the full list
    const allOrders = await storageService.getOrders() || [];
    const updatedAllOrders = [newOrder, ...allOrders];
    
    try {
      await storageService.saveOrders(updatedAllOrders);
      // Update local state with filtered orders
      setOrders(prev => [newOrder, ...prev]);
    } catch (error) {
      console.error("Failed to save order", error);
    }
  };

  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, refreshOrders, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
