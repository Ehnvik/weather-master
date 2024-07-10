import { useCallback } from "react";
import { LocationDetails } from "../models/Location/Classes/LocationDetails";

export const useRemoveLocation = () => {
  const removeLocation = useCallback(
    (locations: LocationDetails[], locationId: number) => {
      return locations.filter((location) => location.id === locationId);
    },
    [],
  );
  return { removeLocation };
};
