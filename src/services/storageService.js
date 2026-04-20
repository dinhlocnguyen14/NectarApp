import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";

const SECRET_KEY = "nectar-app-secret-key"; // In a real app, use environment variables

const KEYS = {
  CART: "cart",
  ORDERS: "orders",
  USER_TOKEN: "userToken",
  USER_EMAIL: "userEmail",
  USER_NAME: "userName",
};

const storageService = {
  /**
   * Encrypt data
   * @param {any} data 
   * @returns {string}
   */
  encrypt: (data) => {
    const strData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(strData, SECRET_KEY).toString();
  },

  /**
   * Decrypt data
   * @param {string} ciphertext 
   * @returns {any}
   */
  decrypt: (ciphertext) => {
    try {
      // Check if it looks like encrypted data (CryptoJS strings usually don't have spaces or start with {)
      if (!ciphertext || ciphertext.startsWith("{") || ciphertext.includes(" ")) {
        return JSON.parse(ciphertext); // Try parsing as plain JSON (for old data)
      }

      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedData) {
        // If decryption results in empty string, it might be old plain data
        return JSON.parse(ciphertext);
      }

      return JSON.parse(decryptedData);
    } catch (error) {
      // If everything fails, it's probably old/corrupted data
      try {
        return JSON.parse(ciphertext);
      } catch (e) {
        return null;
      }
    }
  },

  /**
   * Save data to AsyncStorage with encryption and optional expiration
   * @param {string} key 
   * @param {any} value 
   * @param {number} expireIn Milliseconds from now. 0 means no expiration.
   */
  save: async (key, value, expireIn = 0) => {
    try {
      const dataToSave = {
        value,
        expiry: expireIn ? Date.now() + expireIn : null,
      };
      const encryptedData = storageService.encrypt(dataToSave);
      await AsyncStorage.setItem(key, encryptedData);
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
      throw error;
    }
  },

  /**
   * Get data from AsyncStorage with decryption and expiration check
   * @param {string} key 
   * @returns {any|null}
   */
  get: async (key) => {
    try {
      const encryptedData = await AsyncStorage.getItem(key);
      if (!encryptedData) return null;

      const decryptedData = storageService.decrypt(encryptedData);
      if (!decryptedData) return null;

      const { value, expiry } = decryptedData;

      // Check if expired
      if (expiry && Date.now() > expiry) {
        await storageService.remove(key);
        return null;
      }

      return value;
    } catch (error) {
      console.error(`Error getting data for key ${key}:`, error);
      return null;
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
  saveCart: async (cartItems, userEmail = "") => {
    const key = userEmail ? `${KEYS.CART}_${userEmail}` : KEYS.CART;
    await storageService.save(key, cartItems);
  },

  getCart: async (userEmail = "") => {
    const key = userEmail ? `${KEYS.CART}_${userEmail}` : KEYS.CART;
    return await storageService.get(key);
  },

  clearCart: async (userEmail = "") => {
    const key = userEmail ? `${KEYS.CART}_${userEmail}` : KEYS.CART;
    await storageService.remove(key);
  },

  saveOrders: async (orders) => {
    await storageService.save(KEYS.ORDERS, orders);
  },

  getOrders: async () => {
    return await storageService.get(KEYS.ORDERS);
  },
};

export default storageService;

