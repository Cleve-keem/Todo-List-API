import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import { TodoSchema } from "./todo.schema.js";

export const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: true,
  },
);

Users.hasMany(TodoSchema, {
  foreignKey: "userID", // The field name in the Todo table
  onDelete: "CASCADE", // If a user is deleted, their todos are deleted too
});