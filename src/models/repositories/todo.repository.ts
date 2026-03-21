import { TodoModel } from "../schema/todo.schema.js";
import { TodoCreationAttributes } from "../../dtos/types/todo.type.js";

export default class TodoRepository {
  static async store(todo: TodoCreationAttributes) {
    return await TodoModel.create(todo);
  }
  static async findByTitle(title: string) {
    return await TodoModel.findOne({ where: { title }, raw: true });
  }
  static async findAll(userID: number) {
    return await TodoModel.findAll({
      where: { userID },
      attributes: ["id", "title", "description"],
      raw: true,
    });
  }
  static async findByIdAndUser(todoId: number, userId: number) {
    return await TodoModel.findOne({
      where: { id: todoId, userID: userId },
    });
  }
  static async deleteByIdAndUser(id: number, userID: number) {
    const deletedRows = await TodoModel.destroy({
      where: { id, userID },
    });

    return deletedRows > 0;
  }
}
