import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import schemaValidator from "../middleware/schemaValidator.js";
import { checkRole, validateToken } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get(
  "/",
  validateToken,
  checkRole("admin"),
  userController.getAllUser,
);

userRouter.post(
  "/",
  schemaValidator("/auth/signup"),
  userController.createUser,
);

userRouter.get("/:id", userController.getUserById);

export default userRouter;
