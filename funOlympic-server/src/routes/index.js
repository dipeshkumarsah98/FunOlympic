import { Router } from "express";
import userRouter from "./user.route.js";
import authRouter from "./auth.route.js";
import categoryRouter from "./category.route.js";
import eventRouter from "./event.route.js";

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/category", categoryRouter);
apiRouter.use("/event", eventRouter);

apiRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

export default apiRouter;
