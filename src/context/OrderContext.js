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
      const savedOrders = await storageService.getOrders();
      if (savedOrders) {
        setOrders(savedOrders);
      }
    } catch (error) {
      console.error("Failed to load orders", error);
    }
  };

  const addOrder = async (items, total) => {
    const newOrder = {
      id: Date.now().toString(),
      items: [...items],
      total: total,
      date: new Date().toISOString(),
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);

    try {
      await storageService.saveOrders(updatedOrders);
    } catch (error) {
      console.error("Failed to save order", error);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
