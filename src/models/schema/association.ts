import { UserModel } from "./user.schema.js";
import { TodoModel } from "./todo.schema.js";

export const setupAssociations = () => {
  UserModel.hasMany(TodoModel, {
    foreignKey: "userID",
    onDelete: "CASCADE",
  });

  TodoModel.belongsTo(UserModel, {
    foreignKey: "userID",
    targetKey: "id",
  });
};
