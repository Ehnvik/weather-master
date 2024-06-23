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

interface IWeatherContext {
  weatherData: IWeatherResponse;
}

interface IWeatherProviderProps {
  children: ReactNode;
}

export const WeatherContext = createContext<IWeatherContext | null>(null);

export const WeatherProvider = ({ children }: IWeatherProviderProps) => {
  const [weatherData, setWeatherData] = useState<IWeatherResponse>(
    initialWeatherResponse,
  );

  useEffect(() => {
    const getWeatherData = async () => {
      const response = await fetchWeatherData(
        "59.35856063244829",
        "17.905359111139767",
      );

      setWeatherData(response);
    };
    getWeatherData();
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherData }}>
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
