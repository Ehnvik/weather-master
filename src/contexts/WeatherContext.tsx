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
import { initialLocationCoordinates } from "../initialValues/weather/initialLocationCoordinates";
import { ILocationCoordinates } from "../models/Weather/ILocationCoordinates";

interface IWeatherContext {
  weatherData: IWeatherResponse;
  getLocationCoordinates: (coordinates: ILocationCoordinates) => void;
}

interface IWeatherProviderProps {
  children: ReactNode;
}

const WeatherContext = createContext<IWeatherContext | null>(null);

export const WeatherProvider = ({ children }: IWeatherProviderProps) => {
  const [weatherData, setWeatherData] = useState<IWeatherResponse>(
    initialWeatherResponse,
  );
  const [locationCoordinates, setlocationCoordinates] =
    useState<ILocationCoordinates>(initialLocationCoordinates);

  const getLocationCoordinates = (coordinates: ILocationCoordinates) => {
    setlocationCoordinates(coordinates);
  };

  useEffect(() => {
    const getWeatherData = async () => {
      const response = await fetchWeatherData(
        locationCoordinates.lat,
        locationCoordinates.lon,
      );

      setWeatherData(response);
    };
    getWeatherData();
  }, [locationCoordinates]);

  return (
    <WeatherContext.Provider value={{ weatherData, getLocationCoordinates }}>
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
