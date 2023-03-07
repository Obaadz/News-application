"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuthExpress = void 0;
const dotenv_1 = require("dotenv");
const express_jwt_1 = require("express-jwt");
(0, dotenv_1.config)({ path: ".env.local" });
const SECRET = process.env.SECRET;
exports.jwtAuthExpress = (0, express_jwt_1.expressjwt)({
    secret: SECRET,
    algorithms: ["HS256"],
});
