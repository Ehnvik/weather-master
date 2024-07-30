import { weatherApi } from "../api/weatherApi";
import { IWeatherResponse } from "../models/weather/IWeatherResponse";
import { getCachedData, setCachedData } from "./cacheService";

export const fetchWeatherData = async (
  lat: string,
  lon: string,
): Promise<IWeatherResponse> => {
  const cacheKey = `location-${lat}-${lon}`;
  const cachedData = getCachedData(cacheKey) as IWeatherResponse;

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await weatherApi.get<IWeatherResponse>("", {
      params: {
        lat: lat,
        lon: lon,
      },
    });

    setCachedData(cacheKey, response.data, 300);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error();
  }
};
