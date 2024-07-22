import { useState, useEffect, useCallback } from "react";
import { ILocationCoordinates } from "../models/Location/Interfaces/ILocationCoordinates";
import { LocationCoordinates } from "../models/Location/Classes/LocationCoordinates";

export const useGeolocation = () => {
  const [currentGeolocation, setCurrentGeolocation] =
    useState<ILocationCoordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(success, handleError);
  }, []);

  const createLocationObject = (
    lat: number,
    lon: number,
  ): ILocationCoordinates => {
    return new LocationCoordinates(lat.toString(), lon.toString());
  };

  const success = (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setCurrentGeolocation(createLocationObject(lat, lon));
  };

  const handleError = (error: GeolocationPositionError) => {
    console.error("Geolocation error:", error);
    const defaultLat = 59.33013312944699;
    const defaultLon = 18.063177658357837;
    setCurrentGeolocation(createLocationObject(defaultLat, defaultLon));
    setLocationError("Unable to retrieve your location");
  };

  const requestGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(success, handleError);
  }, []);

  return { currentGeolocation, locationError, requestGeolocation };
};
