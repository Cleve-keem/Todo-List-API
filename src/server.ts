import dotenv from "dotenv";
dotenv.config();

import expressLoader from "./app.js";
import { Application } from "express";
import { Server } from "node:http";
import ProcessSupervisor from "./config/process-supervisor.js";
import { sequelize } from "./config/database.js";
import { connectRedis } from "./lib/redisClient.js";
import { setupAssociations } from "./models/schema/association.js";

const startServer = async () => {
  const app: Application = expressLoader();
  const PORT = process.env.PORT!;

  try {
    await connectRedis();
    setupAssociations();
    await sequelize.sync({ alter: false });
    console.log("✅ [Sequelize] 📅 Tables have been synced!");

    const server: Server = app.listen(PORT, () =>
      console.log(`✅ [Boot] Server is listening on ${PORT}`),
    );
    new ProcessSupervisor(server, sequelize).initialize();
  } catch (error: any) {
    console.error(
      "❌ [BOOT ERROR] Failed to start the application:",
      error.message,
    );
    process.exit(1);
  }
};

startServer();
