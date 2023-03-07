"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enums_1 = require("../types/enums");
const user_1 = require("../services/user");
const TOKEN_EXPIRE_IN_MS = Number(process.env.TOKEN_EXPIRE_IN_MS) || 2629746;
class UserController {
    static login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SECRET = process.env.SECRET;
                if (!SECRET) {
                    console.log(enums_1.ERROR_MESSAGES.NO_SECRET_KEY_DEFINED);
                    throw new Error(enums_1.ERROR_MESSAGES.SERVER_ERROR);
                }
                const user = request.body.user;
                if (!((user === null || user === void 0 ? void 0 : user.email) && (user === null || user === void 0 ? void 0 : user.password)))
                    throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_EMAIL_OR_PASSWORD);
                const dbUser = yield (0, user_1.findUser)({
                    email: user.email,
                    password: user.password,
                });
                if (!dbUser)
                    throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_EMAIL_OR_PASSWORD);
                const token = jsonwebtoken_1.default.sign(dbUser.toObject(), SECRET);
                response
                    .cookie("token", token, { maxAge: TOKEN_EXPIRE_IN_MS })
                    .status(201)
                    .send({ token });
            }
            catch (err) {
                response.status(401).send(err.message || enums_1.ERROR_MESSAGES.SERVER_ERROR);
            }
        });
    }
    static register(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SECRET = process.env.SECRET;
                if (!SECRET) {
                    console.log(enums_1.ERROR_MESSAGES.NO_SECRET_KEY_DEFINED);
                    throw new Error(enums_1.ERROR_MESSAGES.SERVER_ERROR);
                }
                const user = request.body.user;
                if (!(user && user.email && user.password && user.name))
                    throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_REGISTER_DATA);
                const dbUser = yield (0, user_1.insertUser)(user).catch((err) => {
                    if ((err === null || err === void 0 ? void 0 : err.code) === 11000)
                        throw new Error(enums_1.ERROR_MESSAGES.DUPLICATE);
                    throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_REGISTER_DATA);
                });
                const token = jsonwebtoken_1.default.sign(dbUser.toObject(), SECRET);
                response
                    .cookie("token", token, { maxAge: TOKEN_EXPIRE_IN_MS })
                    .status(201)
                    .send("Authenticated");
            }
            catch (err) {
                response.status(401).send(err.message || enums_1.ERROR_MESSAGES.SERVER_ERROR);
            }
        });
    }
    static get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.params.id, authUser = request.auth;
                if (userId !== (authUser === null || authUser === void 0 ? void 0 : authUser._id))
                    throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_TOKEN);
                const dbUser = yield (0, user_1.findUser)({ _id: userId }, "-password -__v");
                if (!dbUser)
                    throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_EMAIL);
                response.status(200).send(dbUser);
            }
            catch (err) {
                response.status(401).send(err.message || enums_1.ERROR_MESSAGES.SERVER_ERROR);
            }
        });
    }
}
exports.default = UserController;
