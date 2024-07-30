import { locationApi } from "../api/locationApi";
import { IGeolocationResponse } from "../models/location/IGeolocationResponse";
import { ILocationsResponse } from "../models/location/ILocationsResponse";
import { getCachedData, setCachedData } from "./cacheService";

export const fetchLocationsByName = async (
  searchValue: string,
): Promise<ILocationsResponse[]> => {
  const cacheKey = `location-${searchValue}`;
  const cachedData = getCachedData(cacheKey) as ILocationsResponse[];

  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await locationApi.get<ILocationsResponse[]>("search", {
      params: {
        city: searchValue,
      },
    });
    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error();
  }
};

export const fetchLocationByCoordinates = async (
  lat: string,
  lon: string,
): Promise<IGeolocationResponse> => {
  const cacheKey = `location-${lat}-${lon}`;
  const cachedData = getCachedData(cacheKey) as IGeolocationResponse;

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await locationApi.get<IGeolocationResponse>("reverse", {
      params: {
        lat: lat,
        lon: lon,
      },
    });

    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error();
  }
};
