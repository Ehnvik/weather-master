import { Request, Response } from "express";
import {
  fetchLocationByCoordinates,
  fetchLocationsByName,
} from "../services/locationService";

export const getLocationsByName = async (req: Request, res: Response) => {
  const { city } = req.query;
  if (!city || city === "") {
    return res.status(400).json({ error: "Search value can't be empty" });
  }
  try {
    const locations = await fetchLocationsByName(city as string);
    if (!locations || locations.length === 0) {
      return res.json([]);
    } else {
      return res.json(locations);
    }
  } catch (error) {
    console.error("Error getting locations: ", error);
    return res.status(500).json({ error: "Error getting locations" });
  }
};

export const getLocationByCoordinates = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }
  try {
    const location = await fetchLocationByCoordinates(
      lat as string,
      lon as string,
    );
    if (!location) {
      return res.status(404).json({ error: "No location found" });
    } else {
      return res.json(location);
    }
  } catch (error) {
    console.error("Error getting location: ", error);
    return res.status(500).json("Error getting location");
  }
};
