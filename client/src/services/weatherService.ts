import { IWeatherResponse } from "../models/Weather/Interfaces/IWeatherResponse";
import { axiosInstance } from "./axiosInstance";

export const fetchWeatherData = async (
  lat: string,
  lon: string,
): Promise<IWeatherResponse> => {
  try {
    const response = await axiosInstance.get("/weather", {
      params: {
        lat: lat,
        lon: lon,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      console.error(
        "Too many requests from this IP, please try again after 15 minutes",
      );
    } else {
      console.error("Error fetching weather data", error);
    }
    throw error;
  }
};
