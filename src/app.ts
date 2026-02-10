import express, { Application } from "express";
import { limiter } from "./middleware/limiter.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const expressLoader = () => {
  const app: Application = express();

  // middlewares
  app.use(limiter);
  app.use(express.json());
  app.use(errorHandler);

  // apis
  app.get("/api/v1/health", (_, res) =>
    res.status(200).json({ status: "UP", pid: process.pid }),
  );
  app.use("/api/v1", userRoutes);

  return app;
};

export default expressLoader;
