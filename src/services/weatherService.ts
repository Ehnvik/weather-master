import axios from "axios";
import { IWeatherResponse } from "../models/Weather/IWeatherResponse";
import { IWeatherLocation } from "../models/Weather/IWeatherLocation";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherData = async (
  lat: string,
  lon: string,
): Promise<IWeatherResponse> => {
  try {
    let response = await axios.get<IWeatherResponse>(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fething weather data", error);
    throw error;
  }
};

export const fetchWeatherLocation = async (lat: string, lon: string) => {
  try {
    let response = await axios.get<IWeatherLocation>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sv&appid=${apiKey}&units=metric`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fething weather location", error);
    throw error;
  }
};
