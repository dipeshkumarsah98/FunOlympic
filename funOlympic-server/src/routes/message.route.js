import { Router } from "express";
import { validateToken } from "../middleware/auth.middleware.js";
import * as messageController from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.post("/", validateToken, messageController.createOne);
messageRouter.get("/", messageController.findAll);

export default messageRouter;
