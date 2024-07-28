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
import { ILocationCoordinates } from "../models/Location/Interfaces/ILocationCoordinates";
import { IGeolocationResponse } from "../models/Location/Interfaces/IGeolocationResponse";
import { initialGeolocation } from "../initialValues/location/initialGeolocation";
import { initialLocationDetails } from "../initialValues/location/initialLocationDetails";
import { initialLocationCoordinates } from "../initialValues/location/initialLocationCoordinates";
import { requestGeolocation } from "../utils/geolocationHelpers";
import Cookies from "js-cookie";

interface ILocationContext {
  locations: LocationDetails[];
  setSearchValue: (searchValue: string) => void;
  searchValue: string;
  currentLocation: IGeolocationResponse;
  resetSearchResults: () => void;
  setSelectedLocation: (location: LocationDetails) => void;
  selectedLocation: LocationDetails;
  noLocationsMessage: string;
  isLoading: boolean;
  getCurrentLocation: () => void;
}

interface ILocationProviderProps {
  children: ReactNode;
}

const LocationsContext = createContext<ILocationContext | null>(null);

export const LocationProvider = ({ children }: ILocationProviderProps) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationDetails>(
    initialLocationDetails,
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [locations, setLocations] = useState<LocationDetails[]>([]);
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [coordinates, setCoordinates] = useState<ILocationCoordinates>(() => {
    const geolocation = localStorage.getItem("userGeolocation");
    return geolocation ? JSON.parse(geolocation) : initialLocationCoordinates;
  });
  const [currentLocation, setCurrentLocation] =
    useState<IGeolocationResponse>(initialGeolocation);
  const [noLocationsMessage, setNoLocationsMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetSearchResults = () => {
    setLocations([]);
    setSearchValue("");
    setDebouncedValue("");
    setNoLocationsMessage("");
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchValue === "") {
      resetSearchResults();
    }
  }, [searchValue]);

  const handleGeolocationSuccess = (location: ILocationCoordinates) => {
    setCoordinates(location);
    localStorage.setItem("userGeolocation", JSON.stringify(location));
  };

  const handleGeolocationError = (defaultLocation: ILocationCoordinates) => {
    setCoordinates(defaultLocation);
    localStorage.setItem("userGeolocation", JSON.stringify(defaultLocation));
  };

  const getCurrentLocation = () => {
    const geolocationConsent = Cookies.get("geolocationConsent");

    if (geolocationConsent === "declined") {
      return;
    }

    requestGeolocation(handleGeolocationSuccess, handleGeolocationError);
  };

  useEffect(() => {
    const getGeolocationData = async () => {
      if (coordinates && coordinates.lat && coordinates.lon) {
        const response = await fetchLocationByCoordinates(
          coordinates.lat,
          coordinates.lon,
        );

        setCurrentLocation(response);
      }
    };

    getGeolocationData();
  }, [coordinates]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue.length >= 3) {
        setDebouncedValue(searchValue);
      } else {
        setLocations([]);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    if (searchValue.length >= 3) {
      setIsLoading(true);
    }
  }, [searchValue]);

  useEffect(() => {
    const getLocationsData = async () => {
      if (debouncedValue !== "") {
        const response = await fetchLocationsByName(debouncedValue);
        if ("error" in response) {
          setNoLocationsMessage(response.message);
        } else if (response.length === 0) {
          setNoLocationsMessage("No locations found");
          setLocations([]);
          setDebouncedValue("");
        } else {
          const locationsList = createLocationDetailsList(response);
          setNoLocationsMessage("");
          setLocations(locationsList);
        }
        setDebouncedValue("");
        setIsLoading(false);
      }
    };

    getLocationsData();
  }, [debouncedValue]);
  return (
    <LocationsContext.Provider
      value={{
        locations,
        setSearchValue,
        searchValue,
        currentLocation,
        resetSearchResults,
        setSelectedLocation,
        selectedLocation,
        noLocationsMessage,
        isLoading,
        getCurrentLocation,
      }}>
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
