import { weatherApi } from "../api/weatherApi";
import { IWeatherResponse } from "../models/weather/IWeatherResponse";

export const fetchWeatherData = async (
  lat: string,
  lon: string,
): Promise<IWeatherResponse> => {
  try {
    const response = await weatherApi.get<IWeatherResponse>("", {
      params: {
        lat: lat,
        lon: lon,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error();
  }
};
