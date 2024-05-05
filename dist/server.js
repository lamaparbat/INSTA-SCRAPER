"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const app_1 = __importDefault(require("./app"));
const bootstrap_1 = __importDefault(require("./shared/bootstrap"));
(0, bootstrap_1.default)().then(() => {
    app_1.default.listen(process.env.PORT || 8000, () => {
        console.log("Server listening on port " + process.env.PORT);
    });
});
