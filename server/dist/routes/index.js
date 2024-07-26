"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const weatherRoutes_1 = __importDefault(require("./weather/weatherRoutes"));
const locationRoutes_1 = __importDefault(require("./location/locationRoutes"));
const router = (0, express_1.Router)();
exports.router = router;
router.use("/weather", weatherRoutes_1.default);
router.use("/location", locationRoutes_1.default);
