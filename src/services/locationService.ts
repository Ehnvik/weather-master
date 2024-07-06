import axios from "axios";
import { ILocationsResponse } from "../models/Location/Interfaces/ILocationsResponse";
import { IGeolocationResponse } from "../models/Location/Interfaces/IGeolocationResponse";

const geoCodingApiKey = import.meta.env.VITE_GEOCODING_API_KEY;

export const fetchLocationsByName = async (
  searchValue: string,
): Promise<ILocationsResponse[]> => {
  try {
    let response = await axios.get<ILocationsResponse[]>(
      `https://geocode.maps.co/search?city=${searchValue}&api_key=${geoCodingApiKey}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fething weather location", error);
    throw error;
  }
};

export const fetchLocationByCoordinates = async (
  lat: string,
  lon: string,
): Promise<IGeolocationResponse> => {
  try {
    let response = await axios.get<IGeolocationResponse>(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${geoCodingApiKey}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fething weather location", error);
    throw error;
  }
};
