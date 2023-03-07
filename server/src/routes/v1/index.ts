import express from "express";
import usersRoutes from "./users";
import postsRoutes from "./posts";

const v1Routes = express.Router();

v1Routes.use("/v1", usersRoutes);
v1Routes.use("/v1", postsRoutes);

export default v1Routes;
