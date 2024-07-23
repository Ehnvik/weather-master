import { Request, Response } from "express";
import {
  fetchLocationByCoordinates,
  fetchLocationsByName,
} from "../services/locationservice";

export const getLocationsByName = async (req: Request, res: Response) => {
  const { city } = req.query;
  try {
    const locations = await fetchLocationsByName(city as string);
    if (!locations) {
      return res.status(404).send();
    }
    res.json(locations);
  } catch (error) {
    res.status(500).send("Error getting locations");
  }
};

export const getLocationByCoordinates = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;
  try {
    const location = await fetchLocationByCoordinates(
      lat as string,
      lon as string,
    );
    res.json(location);
  } catch (error) {
    res.status(500).send("Error getting location");
  }
};
