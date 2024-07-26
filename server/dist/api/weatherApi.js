"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherApi = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenvConfig_1 = __importDefault(require("../config/dotenvConfig"));
exports.weatherApi = axios_1.default.create({
    baseURL: dotenvConfig_1.default.WEATHER_API_BASE_URL,
    params: {
        appid: dotenvConfig_1.default.WEATHER_API_KEY,
        units: "metric",
    },
});
