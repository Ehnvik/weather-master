import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getGeoLocationByName } from "../services/weatherService";
import { LocationDetails } from "../models/Weather/LocationDetails";
import { createLocationDetailsList } from "../utils/locationHelpers";

interface ILocationContext {
  locations: LocationDetails[];
  setSearchValue: (searchValue: string) => void;
  searchValue: string;
}

interface ILocationProviderProps {
  children: ReactNode;
}

const LocationsContext = createContext<ILocationContext | null>(null);

export const LocationProvider = ({ children }: ILocationProviderProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [locations, setLocations] = useState<LocationDetails[]>([]);
  const [debouncedValue, setDebouncedValue] = useState<string>("");

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
    const getWeatherLocations = async () => {
      const response = await getGeoLocationByName(debouncedValue);
      const locationsList = createLocationDetailsList(response);
      console.log("LocationsList: ", locationsList);

      setLocations(locationsList);
    };

    getWeatherLocations();
  }, [debouncedValue]);
  return (
    <LocationsContext.Provider
      value={{ locations, setSearchValue, searchValue }}>
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
