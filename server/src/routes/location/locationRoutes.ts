import { Router } from "express";
import {
  getLocationByCoordinates,
  getLocationsByName,
} from "../../controller/locationControllers";

const locationRouter = Router();

locationRouter.get("/name", getLocationsByName);

locationRouter.get("/coordinates", getLocationByCoordinates);

export default locationRouter;
