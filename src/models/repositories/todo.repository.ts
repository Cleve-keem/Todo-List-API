import { TodoModel } from "../schema/todo.schema.js";
import { TodoCreationAttributes } from "../../dtos/types/todo.type.js";

export default class TodoRepository {
  static async store(todo: TodoCreationAttributes) {
    return await TodoModel.create(todo);
  }
  static async findTitle(todoTitle: string) {
    return await TodoModel.findOne({ where: { title: todoTitle } });
  }
}
