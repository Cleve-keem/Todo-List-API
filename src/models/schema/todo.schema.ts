import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import { Users } from "./user.schema.js";

export const TodoSchema = sequelize.define(
  "todos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "todos", timestamps: true, createdAt: true, updatedAt: true },
);

TodoSchema.belongsTo(Users, {
  foreignKey: "userID", // Must match the foreignKey above
  targetKey: "id", // Points to the primary key in the Users table
});
