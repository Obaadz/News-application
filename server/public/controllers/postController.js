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
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../services/post");
const enums_1 = require("../types/enums");
class PostController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield (0, post_1.findPosts)({});
            res.status(201).send(posts);
        });
    }
    static create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = request.body.post, user = request.auth;
                if (!(user === null || user === void 0 ? void 0 : user.email))
                    throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_EMAIL);
                if (!(post.author && post.content && post.createAt && post.image && post.title))
                    throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_EMAIL);
                const dbPost = yield (0, post_1.insertPost)(post).catch((err) => {
                    if ((err === null || err === void 0 ? void 0 : err.code) === 11000)
                        throw new Error(enums_1.ERROR_MESSAGES.DUPLICATE);
                    console.log("Insert Post:", err.message);
                    throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_POST_INPUTS);
                });
                response.status(201).send("Post Created");
            }
            catch (err) {
                response.status(400).send(err.message || enums_1.ERROR_MESSAGES.SERVER_ERROR);
            }
        });
    }
    static update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = request.body.post, user = request.auth;
                if (!(user === null || user === void 0 ? void 0 : user.email))
                    throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_EMAIL);
                const dbPost = yield (0, post_1.updatePost)({ title: post.title }, { $set: Object.assign({}, post) }).catch((err) => {
                    if ((err === null || err === void 0 ? void 0 : err.code) === 11000)
                        throw new Error(enums_1.ERROR_MESSAGES.DUPLICATE);
                    console.log("Update Post:", err.message);
                    throw new Error(enums_1.ERROR_MESSAGES.INCORRECT_POST_INPUTS);
                });
                response.status(201).send("Post Updated");
            }
            catch (err) {
                response.status(400).send(err.message || enums_1.ERROR_MESSAGES.SERVER_ERROR);
            }
        });
    }
}
exports.default = PostController;
