import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const username = process.env.MYSQL_ROOT_USER as string;
const password = process.env.MYSQL_ROOT_PASSWORD as string;
const dbName = (process.env.DATABASE_NAME as string) || "TodoListDatabase";

export const sequelize = new Sequelize(dbName, username, password, {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 4000,
  dialect: "mysql",
  logging: false,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

try {
  await sequelize.authenticate();
  console.log("✅ [Sequelize] Connection has been established successfully.");
} catch (error: any) {
  console.error("❌ [Sequelize] Unable to connect to the database:", error);
}
