import axios from "axios";
import { IWeatherResponse } from "../models/Weather/IWeatherResponse";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherData = async (
  lat: string,
  lon: string,
): Promise<IWeatherResponse> => {
  try {
    let response = await axios.get<IWeatherResponse>(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fething weather data", error);
    throw error;
  }
};
