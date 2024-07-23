import { Router } from "express";
import weatherRouter from "./weather/weatherRoutes";

const router = Router();

router.use("/weather", weatherRouter);

export { router };
