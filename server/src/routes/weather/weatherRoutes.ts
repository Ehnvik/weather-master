import { Router } from "express";
import { getWeatherData } from "../../controller/weatherControllers";

const weatherRouter = Router();

weatherRouter.get("/", getWeatherData);

export default weatherRouter;
