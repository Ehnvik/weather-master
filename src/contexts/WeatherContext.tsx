import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchWeatherData } from "../services/weatherService";
import { IWeatherResponse } from "../models/Weather/IWeatherResponse";
import { initialWeatherResponse } from "../initialValues/weather/initialWeatherResponse";
import { LocationDetails } from "../models/Location/LocationDetails";
import { initialLocationDetails } from "../initialValues/location/initialLocationDetails";
import { useGeolocation } from "../hooks/useGeolocation";
import { initialCurrentLocation } from "../initialValues/location/initialCurrentLocation";
import { ILocationCoordinates } from "../models/Location/ILocationCoordinates";
import { LocationCoordinates } from "../models/Location/LocationCoordinates";

interface IWeatherContext {
  weatherData: IWeatherResponse;
  getLocation: (location: LocationDetails) => void;
  location: LocationDetails;
}

interface IWeatherProviderProps {
  children: ReactNode;
}

const WeatherContext = createContext<IWeatherContext | null>(null);

export const WeatherProvider = ({ children }: IWeatherProviderProps) => {
  const [weatherData, setWeatherData] = useState<IWeatherResponse>(
    initialWeatherResponse,
  );
  const [location, setLocation] = useState<LocationDetails>(
    initialLocationDetails,
  );

  const [locationCoordinates, setLocationCoordinates] =
    useState<ILocationCoordinates>(initialCurrentLocation);

  const { currentGeolocation } = useGeolocation();

  useEffect(() => {
    if (currentGeolocation) {
      setLocationCoordinates(currentGeolocation);
    }
  }, []);

  const getLocation = (location: LocationDetails) => {
    setLocationCoordinates(new LocationCoordinates(location.lat, location.lon));
    setLocation(location);
  };

  useEffect(() => {
    const getWeatherData = async () => {
      const response = await fetchWeatherData(
        locationCoordinates.lat,
        locationCoordinates.lon,
      );
      console.log(response);

      setWeatherData(response);
    };
    getWeatherData();
  }, [location, locationCoordinates]);

  return (
    <WeatherContext.Provider value={{ weatherData, getLocation, location }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
