import { Request, Response } from "express";
import { fetchWeatherData } from "../services/weatherService";

export const getWeatherData = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    const data = await fetchWeatherData(lat as string, lon as string);
    if (!data) {
      return res.status(404).json({ error: "No weather data found" });
    }
    return res.json(data);
  } catch (error) {
    console.error("Error getting weather:", error);
    return res.status(500).json({ error: "Error getting weather" });
  }
};
