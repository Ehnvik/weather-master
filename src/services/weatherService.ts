import axios from "axios";
import { IWeatherResponse } from "../models/Weather/IWeatherResponse";
import { IWeatherLocation } from "../models/Weather/IWeatherLocation";
import { IGeoLocations } from "../models/Weather/IGeoLocations";

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
const geoCodingApiKey = import.meta.env.VITE_GEOCODING_API_KEY;

export const fetchWeatherData = async (
  lat: string,
  lon: string,
): Promise<IWeatherResponse> => {
  try {
    let response = await axios.get<IWeatherResponse>(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`,
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
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sv&appid=${weatherApiKey}&units=metric`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fething weather location", error);
    throw error;
  }
};

// export const getGeoLocationByName = async (
//   searchValue: string,
// ): Promise<IGeoLocations[]> => {
//   try {
//     let response = await axios.get<IGeoLocations[]>(
//       `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${weatherApiKey}`,
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error fething weather location", error);
//     throw error;
//   }
// };

export const getGeoLocationByName = async (
  searchValue: string,
): Promise<IGeoLocations[]> => {
  try {
    let response = await axios.get<IGeoLocations[]>(
      `https://geocode.maps.co/search?city=${searchValue}&api_key=${geoCodingApiKey}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fething weather location", error);
    throw error;
  }
};
