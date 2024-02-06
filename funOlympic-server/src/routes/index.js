import { Router } from "express";
import userRouter from "./user.route";

const apiRouter = Router();

apiRouter.use("/user", userRouter);

apiRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

export default apiRouter;
