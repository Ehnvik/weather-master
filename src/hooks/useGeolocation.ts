import { useState, useEffect } from "react";
import { ILocationCoordinates } from "../models/Location/ILocationCoordinates";
import { LocationCoordinates } from "../models/Location/LocationCoordinates";

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
    console.log("Great Success!");

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

  return { currentGeolocation, locationError };
};
