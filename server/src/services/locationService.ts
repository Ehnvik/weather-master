import { locationApi } from "../api/locationApi";
import { IGeolocationResponse } from "../models/location/IGeolocationResponse";
import { ILocationsResponse } from "../models/location/ILocationsResponse";

export const fetchLocationsByName = async (
  searchValue: string,
): Promise<ILocationsResponse[]> => {
  try {
    const response = await locationApi.get<ILocationsResponse[]>("search", {
      params: {
        city: searchValue,
      },
    });
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
  try {
    const response = await locationApi.get<IGeolocationResponse>("reverse", {
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
