"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weatherControllers_1 = require("../../controller/weatherControllers");
const weatherRouter = (0, express_1.Router)();
weatherRouter.get("/", weatherControllers_1.getWeatherData);
exports.default = weatherRouter;
