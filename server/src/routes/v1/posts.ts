import express from "express";
import PostController from "../../controllers/postController";
import { jwtAuthExpress } from "../../middleware/jwtAuth";

const postsRoutes = express.Router();

postsRoutes.get("/posts", PostController.get);
postsRoutes.get("/posts/:id", PostController.get);
postsRoutes.post("/posts", jwtAuthExpress, PostController.create);
postsRoutes.put("/posts/:id", jwtAuthExpress, PostController.update);

export default postsRoutes;
