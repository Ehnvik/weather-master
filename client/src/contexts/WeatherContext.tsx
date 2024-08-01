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
import { initialWeatherIcon } from "../initialValues/weather/initialWeatherIcon";
import { IWeatherIcon } from "../models/Weather/Interfaces/IWeatherIcon";
import { images } from "../modules/images";
import { useFormatUnits } from "../hooks/useFormatUnits";
import { WeatherLocationData } from "../models/Weather/Classes/WeatherLocationData";
import { initialWeatherLocationData } from "../initialValues/weather/initialWeatherLocationData";

interface IWeatherContext {
  getLocation: (location: LocationDetails) => void;
  weatherIcon: IWeatherIcon;
  weatherLocationData: WeatherLocationData;
  refreshWeatherData: (location: LocationDetails) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [weatherIcon, setWeatherIcon] = useState<IWeatherIcon>(() => {
    const data = sessionStorage.getItem("weatherIcon");
    return data ? JSON.parse(data) : initialWeatherIcon;
  });

  const [weatherLocationData, setWeatherLocationData] =
    useState<WeatherLocationData>(() => {
      const data = sessionStorage.getItem("weatherLocationData");
      return data ? JSON.parse(data) : initialWeatherLocationData;
    });

  const { formattedUnits } = useFormatUnits(weatherData);

  const getLocation = (location: LocationDetails) => {
    setLocation(location);
  };

  const refreshWeatherData = async (location: LocationDetails) => {
    setIsLoading(true);
    if (location.lat !== "" && location.lon !== "") {
      const response = await fetchWeatherData(location.lat, location.lon);
      setWeatherData(response);
    }
  };

  const sendWeatherLocationDataToSessionStorage = (
    weatherLocationData: WeatherLocationData,
  ) => {
    sessionStorage.setItem(
      "weatherLocationData",
      JSON.stringify(weatherLocationData),
    );
  };

  const sendWeatherIconToSessionStorage = (weatherIcon: IWeatherIcon) => {
    sessionStorage.setItem("weatherIcon", JSON.stringify(weatherIcon));
  };

  useEffect(() => {
    if (formattedUnits && location.lat !== "" && location.lon !== "") {
      const weatherLocationData = new WeatherLocationData(
        weatherData,
        location,
        formattedUnits,
        weatherIcon,
      );
      console.log(weatherData);

      setWeatherLocationData(weatherLocationData);
      sendWeatherLocationDataToSessionStorage(weatherLocationData);
      sendWeatherIconToSessionStorage(weatherIcon);
    }
  }, [weatherData, weatherIcon, formattedUnits]);

  useEffect(() => {
    images.forEach((image) => {
      if (image.id === weatherData.current.weather[0].icon) {
        setWeatherIcon(image);
      }
    });
  }, [weatherData]);

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
    <WeatherContext.Provider
      value={{
        getLocation,
        weatherIcon,
        weatherLocationData,
        refreshWeatherData,
        isLoading,
        setIsLoading,
      }}>
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
