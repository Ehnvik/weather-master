"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// LOCAL PORT
const PORT = process.env.PORT || 3000;
// API KEYS
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "";
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY || "";
// BASE URLS
const WEATHER_API_BASE_URL = process.env.WEATHER_API_BASE_URL || "";
const GEOCODING_API_BASE_URL = process.env.GEOCODING_API_BASE_URL || "";
exports.default = {
    PORT,
    WEATHER_API_KEY,
    GEOCODING_API_KEY,
    WEATHER_API_BASE_URL,
    GEOCODING_API_BASE_URL,
};
