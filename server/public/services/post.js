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
exports.deletePost = exports.updatePost = exports.insertPost = exports.findPosts = exports.findPost = void 0;
const enums_1 = require("../types/enums");
const post_1 = __importDefault(require("../models/post"));
function findPost(query, selectedItems) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbPost = yield post_1.default.findOne(query).select(selectedItems ? selectedItems : undefined);
        if (!dbPost)
            throw new Error(enums_1.ERROR_MESSAGES.ERROR_ON_FINDING_POST);
        return dbPost;
    });
}
exports.findPost = findPost;
function findPosts(query, selectedItems) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbPost = yield post_1.default.find(query).select(selectedItems ? selectedItems : undefined);
        if (!dbPost)
            throw new Error(enums_1.ERROR_MESSAGES.ERROR_ON_FINDING_POST);
        return dbPost;
    });
}
exports.findPosts = findPosts;
function insertPost(post) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbPost = new post_1.default(Object.assign({}, post));
        yield dbPost.save();
        return findPost({ _id: dbPost._id });
    });
}
exports.insertPost = insertPost;
function updatePost(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        yield post_1.default.updateOne(query, update);
    });
}
exports.updatePost = updatePost;
function deletePost(query) {
    return __awaiter(this, void 0, void 0, function* () {
        yield post_1.default.updateOne(query, { $unset: { title: 1 } });
    });
}
exports.deletePost = deletePost;
