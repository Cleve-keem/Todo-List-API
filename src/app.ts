import express, { Application } from "express";
import { limiter } from "./middleware/limiter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import { CorsOptions } from "cors";
import cors from "cors";

const expressLoader = () => {
  const app: Application = express();

  const allowOrigins = ["http://localhost:3000"];

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["PUT", "DELETE", "POST", "GET"],
    credentials: true,
  };

  // middlewares
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(limiter);
  app.use(errorHandler);

  // apis
  app.get("/health-check", (_, res) =>
    res.status(200).json({ status: "UP", pid: process.pid }),
  );
  app.use("/api/v1/auth", userRoutes);
  app.use("/api/v1/todos", todoRoutes);

  return app;
};

export default expressLoader;
