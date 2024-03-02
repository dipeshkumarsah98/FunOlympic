import { Router } from "express";
import userRouter from "./user.route.js";
import authRouter from "./auth.route.js";

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);

apiRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

export default apiRouter;
