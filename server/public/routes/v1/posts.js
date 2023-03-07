"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = __importDefault(require("../../controllers/postController"));
const jwtAuth_1 = require("../../middleware/jwtAuth");
const postsRoutes = express_1.default.Router();
postsRoutes.get("/posts", postController_1.default.get);
postsRoutes.post("/posts", jwtAuth_1.jwtAuthExpress, postController_1.default.create);
exports.default = postsRoutes;
