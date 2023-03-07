import express from "express";
import UserController from "../../controllers/userController";
import { jwtAuthExpress } from "../../middleware/jwtAuth";

const usersRoutes = express.Router();

usersRoutes.get("/users/:id", jwtAuthExpress, UserController.get);
usersRoutes.post("/users/login", UserController.login);
usersRoutes.post("/users/register", UserController.register);

export default usersRoutes;
