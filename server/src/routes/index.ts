import { Router } from "express";
import weatherRouter from "./weather/weatherRoutes";
import locationRouter from "./location/locationRoutes";

const router = Router();

router.use("/weather", weatherRouter);
router.use("/location", locationRouter);

export { router };
