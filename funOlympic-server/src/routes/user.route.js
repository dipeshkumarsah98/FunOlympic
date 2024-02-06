import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", userController.getAllUser);

userRouter.post("/", userController.createUser);

userRouter.get("/:id", userController.getUserById);

export default userRouter;
