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
exports.getLocationByCoordinates = exports.getLocationsByName = void 0;
const locationService_1 = require("../services/locationService");
const getLocationsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city } = req.query;
    if (!city || city === "") {
        return res.status(400).json({ error: "Search value can't be empty" });
    }
    try {
        const locations = yield (0, locationService_1.fetchLocationsByName)(city);
        if (!locations || locations.length === 0) {
            return res.json([]);
        }
        else {
            return res.json(locations);
        }
    }
    catch (error) {
        console.error("Error getting locations: ", error);
        return res.status(500).json({ error: "Error getting locations" });
    }
});
exports.getLocationsByName = getLocationsByName;
const getLocationByCoordinates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res
            .status(400)
            .json({ error: "Latitude and longitude are required" });
    }
    try {
        const location = yield (0, locationService_1.fetchLocationByCoordinates)(lat, lon);
        if (!location) {
            return res.status(404).json({ error: "No location found" });
        }
        else {
            return res.json(location);
        }
    }
    catch (error) {
        console.error("Error getting location: ", error);
        return res.status(500).json("Error getting location");
    }
});
exports.getLocationByCoordinates = getLocationByCoordinates;
