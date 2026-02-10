import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const username = process.env.MYSQL_ROOT_USER as string;
const password = process.env.MYSQL_ROOT_PASSWORD as string;

export const sequelize = new Sequelize("TodoListDatabase", username, password, {
  host: process.env.MYSQL_HOST,
  port: 4000,
  dialect: "mysql",
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("✅ [Sequelize] Connection has been established successfully.");
} catch (error: any) {
  console.error("❌ [Sequelize] Unable to connect to the database:", error);
}
