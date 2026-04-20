import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  CART: "cart",
  ORDERS: "orders",
};

const storageService = {
  /**
   * Save data to AsyncStorage
   * @param {string} key 
   * @param {any} value 
   */
  save: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
      throw error;
    }
  },

  /**
   * Get data from AsyncStorage
   * @param {string} key 
   * @returns {any|null}
   */
  get: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error getting data for key ${key}:`, error);
      throw error;
    }
  },

  /**
   * Remove data from AsyncStorage
   * @param {string} key 
   */
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data for key ${key}:`, error);
      throw error;
    }
  },

  // Helper methods for specific data types
  saveCart: async (cartItems) => {
    await storageService.save(KEYS.CART, cartItems);
  },

  getCart: async () => {
    return await storageService.get(KEYS.CART);
  },

  clearCart: async () => {
    await storageService.remove(KEYS.CART);
  },

  saveOrders: async (orders) => {
    await storageService.save(KEYS.ORDERS, orders);
  },

  getOrders: async () => {
    return await storageService.get(KEYS.ORDERS);
  },
};

export default storageService;
