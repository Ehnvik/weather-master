import dotenv from "dotenv";

dotenv.config();

// LOCAL PORT
const PORT = process.env.PORT || 3000;

// API KEYS
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "";
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY || "";

// BASE URLS
const WEATHER_API_BASE_URL = process.env.WEATHER_API_BASE_URL || "";
const GEOCODING_API_BASE_URL = process.env.GEOCODING_API_BASE_URL || "";

export default {
  PORT,
  WEATHER_API_KEY,
  GEOCODING_API_KEY,
  WEATHER_API_BASE_URL,
  GEOCODING_API_BASE_URL,
};
