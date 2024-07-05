import axios from "axios";
import { IGeoLocations } from "../models/Location/IGeoLocations";

const geoCodingApiKey = import.meta.env.VITE_GEOCODING_API_KEY;

export const getGeoLocationByName = async (
  searchValue: string,
): Promise<IGeoLocations[]> => {
  try {
    let response = await axios.get<IGeoLocations[]>(
      `https://geocode.maps.co/search?city=${searchValue}&api_key=${geoCodingApiKey}`,
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fething weather location", error);
    throw error;
  }
};

export const getGeoLocationByCoordinates = async (
  lat: string,
  lon: string,
): Promise<IGeoLocations[]> => {
  try {
    let response = await axios.get<IGeoLocations[]>(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${geoCodingApiKey}`,
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fething weather location", error);
    throw error;
  }
};
