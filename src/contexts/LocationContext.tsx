import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LocationDetails } from "../models/Location/Classes/LocationDetails";
import { createLocationDetailsList } from "../utils/locationHelpers";
import {
  fetchLocationByCoordinates,
  fetchLocationsByName,
} from "../services/locationService";
import { useGeolocation } from "../hooks/useGeolocation";
import { ILocationCoordinates } from "../models/Location/Interfaces/ILocationCoordinates";
import { IGeolocationResponse } from "../models/Location/Interfaces/IGeolocationResponse";
import { initialLocationCoordinates } from "../initialValues/location/initialLocationCoordinates";
import { initialGeolocation } from "../initialValues/location/initialGeolocation";

interface ILocationContext {
  locations: LocationDetails[];
  setSearchValue: (searchValue: string) => void;
  searchValue: string;
  currentLocation: IGeolocationResponse;
}

interface ILocationProviderProps {
  children: ReactNode;
}

const LocationsContext = createContext<ILocationContext | null>(null);

export const LocationProvider = ({ children }: ILocationProviderProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [locations, setLocations] = useState<LocationDetails[]>([]);
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [coordinates, setCoordinates] = useState<ILocationCoordinates>(
    initialLocationCoordinates,
  );
  const [currentLocation, setCurrentLocation] =
    useState<IGeolocationResponse>(initialGeolocation);

  const { currentGeolocation } = useGeolocation();

  useEffect(() => {
    if (currentGeolocation) {
      setCoordinates(currentGeolocation);
    }
  }, [currentGeolocation]);

  useEffect(() => {
    const getGeolocationData = async () => {
      const response = await fetchLocationByCoordinates(
        coordinates.lat,
        coordinates.lon,
      );
      setCurrentLocation(response);
    };

    getGeolocationData();
  }, [coordinates]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue.length >= 3) {
        setDebouncedValue(searchValue);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    const getLocationsData = async () => {
      const response = await fetchLocationsByName(debouncedValue);
      const locationsList = createLocationDetailsList(response);
      setLocations(locationsList);
    };

    getLocationsData();
  }, [debouncedValue]);
  return (
    <LocationsContext.Provider
      value={{ locations, setSearchValue, searchValue, currentLocation }}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationsContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
