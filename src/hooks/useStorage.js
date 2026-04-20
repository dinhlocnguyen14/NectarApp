import { useState, useEffect, useCallback } from "react";
import storageService from "../services/storageService";

/**
 * Custom hook for storage management
 * @param {string} key 
 * @param {any} initialValue 
 * @returns {object} { value, loading, error, setItem, removeItem, refresh }
 */
export const useStorage = (key, initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchValue = useCallback(async () => {
    setLoading(true);
    try {
      const storedValue = await storageService.get(key);
      if (storedValue !== null) {
        setValue(storedValue);
      }
    } catch (err) {
      setError(err);
      console.error(`useStorage Error (get ${key}):`, err);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    fetchValue();
  }, [fetchValue]);

  const setItem = async (newValue, expireIn = 0) => {
    setLoading(true);
    try {
      await storageService.save(key, newValue, expireIn);
      setValue(newValue);
    } catch (err) {
      setError(err);
      console.error(`useStorage Error (set ${key}):`, err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async () => {
    setLoading(true);
    try {
      await storageService.remove(key);
      setValue(null);
    } catch (err) {
      setError(err);
      console.error(`useStorage Error (remove ${key}):`, err);
    } finally {
      setLoading(false);
    }
  };

  return {
    value,
    loading,
    error,
    setItem,
    removeItem,
    refresh: fetchValue,
  };
};

export default useStorage;
