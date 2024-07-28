import { Router } from "express";
import { getWeatherData } from "../../controller/weatherControllers";
import { apiLimiter } from "../../middleware/reateLimiter";

const weatherRouter = Router();

weatherRouter.get("/", apiLimiter, getWeatherData);

export default weatherRouter;
