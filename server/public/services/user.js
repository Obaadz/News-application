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
exports.deleteUser = exports.updateUser = exports.insertUser = exports.findUser = void 0;
const enums_1 = require("../types/enums");
const user_1 = __importDefault(require("../models/user"));
function findUser(query, selectedItems) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbUser = yield user_1.default.findOne(query).select(selectedItems ? selectedItems : undefined);
        if (!dbUser)
            throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_EMAIL);
        return dbUser;
    });
}
exports.findUser = findUser;
function insertUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbUser = new user_1.default(Object.assign({}, user));
        yield dbUser.save();
        return findUser({ email: dbUser.email }, ["email"]);
    });
}
exports.insertUser = insertUser;
function updateUser(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user_1.default.updateOne(query, update);
    });
}
exports.updateUser = updateUser;
function deleteUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user_1.default.updateOne({ email: user.email }, { $unset: { email: 1 } });
    });
}
exports.deleteUser = deleteUser;
