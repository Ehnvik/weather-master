"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locationControllers_1 = require("../../controller/locationControllers");
const locationRouter = (0, express_1.Router)();
locationRouter.get("/name", locationControllers_1.getLocationsByName);
locationRouter.get("/coordinates", locationControllers_1.getLocationByCoordinates);
exports.default = locationRouter;
