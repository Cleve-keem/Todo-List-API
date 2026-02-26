import { Users } from "./user.schema.js";
import { TodoSchema } from "./todo.schema.js";

export const setupAssociations = () => {
  Users.hasMany(TodoSchema, {
    foreignKey: "userID",
    onDelete: "CASCADE",
  });

  TodoSchema.belongsTo(Users, {
    foreignKey: "userID",
    targetKey: "id",
  });
};
