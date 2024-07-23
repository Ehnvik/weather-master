import axios from "axios";
import config from "../config/dotenvConfig";

export const locationApi = axios.create({
  baseURL: config.GEOCODING_API_BASE_URL,
  params: {
    api_key: config.GEOCODING_API_KEY,
  },
});
