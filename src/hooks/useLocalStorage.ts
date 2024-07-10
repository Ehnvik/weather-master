import { useCallback } from "react";
import { LocationDetails } from "../models/Location/Classes/LocationDetails";

export const useLocalStorage = (key: string) => {
  const getValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error reading localStorage key “" + key + "”: ", error);
      return [];
    }
  }, [key]);

  const setValue = useCallback(
    (value: LocationDetails[]) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error setting localStorage key “" + key + "”: ", error);
      }
    },
    [key],
  );

  return { getValue, setValue };
};
