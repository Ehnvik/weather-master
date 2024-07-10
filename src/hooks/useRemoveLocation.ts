import { useCallback } from "react";
import { LocationDetails } from "../models/Location/Classes/LocationDetails";

export const useRemoveLocation = () => {
  const removeLocation = useCallback(
    (currentLocations: LocationDetails[], locationId: number) => {
      return currentLocations.filter((location) => location.id !== locationId);
    },
    [],
  );
  return { removeLocation };
};
