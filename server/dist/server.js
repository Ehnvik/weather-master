"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenvConfig_1 = __importDefault(require("./config/dotenvConfig"));
const run = () => {
    try {
        app_1.default.listen(dotenvConfig_1.default.PORT, () => {
            console.log(`Server is listening on http://localhost:${dotenvConfig_1.default.PORT}`);
        });
    }
    catch (error) {
        console.error(error);
    }
};
run();
