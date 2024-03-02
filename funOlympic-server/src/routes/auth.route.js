import { Router } from "express";
import schemaValidator from "../middleware/schemaValidator.js";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  schemaValidator("/auth/signup"),
  authController.signUp,
);

authRouter.post(
  "/signin",
  schemaValidator("/auth/signin"),
  authController.signIn,
);
export default authRouter;
