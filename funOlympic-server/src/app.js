import "express-async-errors";

import express from "express";
import bodyParser from "body-parser";
import notFoundHandler from "./middleware/notFoundHandler.middleware.js";
import errorHandler from "./middleware/errorHandler.middleware.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(notFoundHandler); // Not found middleware. It will get triggered when user try to access invalid route.

app.use(errorHandler); // Error handler middleware. It will get triggered when any error is encounterd in our app.

app.listen(PORT, () => {
  console.log(`Server started successfully in http://localhost:${PORT}`);
});
