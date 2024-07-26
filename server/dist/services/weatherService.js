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
exports.fetchWeatherData = void 0;
const weatherApi_1 = require("../api/weatherApi");
const fetchWeatherData = (lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield weatherApi_1.weatherApi.get("", {
            params: {
                lat: lat,
                lon: lon,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error: ", error);
        throw new Error();
    }
});
exports.fetchWeatherData = fetchWeatherData;
