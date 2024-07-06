import { useEffect, useState } from "react";
import { IGeolocationResponse } from "../models/Location/Interfaces/IGeolocationResponse";
import { LocationDetails } from "../models/Location/Classes/LocationDetails";
import { initialLocationDetails } from "../initialValues/location/initialLocationDetails";
import { IGeolocationDetails } from "../models/Location/Interfaces/IGeolocationDetails";

export const useCurrentLocation = (
  currentGeolocation: IGeolocationResponse,
) => {
  const [geolocation, setGeolocation] = useState<LocationDetails>(
    initialLocationDetails,
  );

  useEffect(() => {
    const { country, county } = currentGeolocation.address;
    const { place_id, lat, lon } = currentGeolocation;
    const optionalKeys: (keyof IGeolocationDetails)[] = [
      "suburb",
      "city",
      "town",
      "village",
      "hamlet",
    ];
    const cityKey = optionalKeys.find(
      (key) => currentGeolocation.address[key] !== undefined,
    );

    if (!cityKey) return;

    const city = currentGeolocation.address[cityKey] as string;

    setGeolocation(
      new LocationDetails(place_id, lat, lon, city, country, county),
    );
  }, [currentGeolocation]);
  return { geolocation };
};
