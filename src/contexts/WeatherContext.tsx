import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchWeatherData } from "../services/weatherService";
import { IWeatherResponse } from "../models/Weather/Interfaces/IWeatherResponse";
import { initialWeatherResponse } from "../initialValues/weather/initialWeatherResponse";
import { LocationDetails } from "../models/Location/Classes/LocationDetails";
import { initialLocationDetails } from "../initialValues/location/initialLocationDetails";

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

  const getLocation = (location: LocationDetails) => {
    setLocation(location);
  };

  useEffect(() => {
    const getWeatherData = async () => {
      if (location.lat !== "" && location.lon !== "") {
        const response = await fetchWeatherData(location.lat, location.lon);

        setWeatherData(response);
      }
    };
    getWeatherData();
  }, [location]);

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
