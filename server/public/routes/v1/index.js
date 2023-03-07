"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./users"));
const posts_1 = __importDefault(require("./posts"));
const v1Routes = express_1.default.Router();
v1Routes.use("/v1", users_1.default);
v1Routes.use("/v1", posts_1.default);
exports.default = v1Routes;
