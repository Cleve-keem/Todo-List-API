import express, { Application } from "express";
import { limiter } from "./middleware/limiter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js"

const expressLoader = () => {
  const app: Application = express();

  // middlewares
  app.use(limiter);
  app.use(express.json());
  app.use(errorHandler);

  // apis
  app.get("/health-check", (_, res) =>
    res.status(200).json({ status: "UP", pid: process.pid }),
  );
  app.use("/api/v1/auth", userRoutes);
  app.use("/api/v1/todo", todoRoutes)

  return app;
};

export default expressLoader;
