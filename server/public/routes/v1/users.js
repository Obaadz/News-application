"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../controllers/userController"));
const jwtAuth_1 = require("../../middleware/jwtAuth");
const usersRoutes = express_1.default.Router();
usersRoutes.get("/users/:id", jwtAuth_1.jwtAuthExpress, userController_1.default.get);
usersRoutes.post("/users/login", userController_1.default.login);
usersRoutes.post("/users/register", userController_1.default.register);
exports.default = usersRoutes;
