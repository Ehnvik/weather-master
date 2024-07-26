"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherData = void 0;
const weatherService_1 = require("../services/weatherService");
const getWeatherData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res
            .status(400)
            .json({ error: "Latitude and longitude are required" });
    }
    try {
        const data = yield (0, weatherService_1.fetchWeatherData)(lat, lon);
        if (!data) {
            return res.status(404).json({ error: "No weather data found" });
        }
        return res.json(data);
    }
    catch (error) {
        console.error("Error getting weather:", error);
        return res.status(500).json({ error: "Error getting weather" });
    }
});
exports.getWeatherData = getWeatherData;
