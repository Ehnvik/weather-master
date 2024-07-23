import axios from "axios";
import config from "../config/dotenvConfig";

export const weatherApi = axios.create({
  baseURL: config.WEATHER_API_BASE_URL,
  params: {
    appid: config.WEATHER_API_KEY,
    units: "metric",
  },
});
