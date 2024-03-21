import { Router } from "express";
import { validateOtp } from "../middleware/auth.middleware.js";
import schemaValidator from "../middleware/schemaValidator.js";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  schemaValidator("/auth/signup"),
  validateOtp,
  authController.signUp
);

authRouter.post(
  "/signin",
  schemaValidator("/auth/signin"),
  authController.signIn
);

authRouter.post(
  "/send-otp",
  schemaValidator("/auth/send-otp"),
  authController.sendOtp
);

export default authRouter;
