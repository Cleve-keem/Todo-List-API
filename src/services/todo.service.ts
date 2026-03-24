import { TodoCreationAttributes } from "../dtos/types/todo.type.js";
import {
  TodoNotFoundError,
  TodoTitleExistError,
} from "../exceptions/TodoError.js";
import TodoRepository from "../models/repositories/todo.repository.js";

class TodoService {
  static async createTodo(todo: TodoCreationAttributes) {
    const existTodo = await TodoRepository.findByTitle(
      todo.title,
      todo.userID!,
    );
    if (existTodo)
      throw new TodoTitleExistError("You already have a todo with this title");

    const result = await TodoRepository.store(todo);
    return {
      id: result.dataValues.id,
      title: result.dataValues.title,
      description: result.dataValues.description,
    };
  }

  static async getTodo(todoId: number, userID: number) {
    const todo = await TodoRepository.findByIdAndUser(todoId, userID);
    if (!todo) throw new TodoNotFoundError("Todo not found or access denied");
    return todo;
  }

  static async getAllTodos(userID: number) {
    const todos = await TodoRepository.findAllUserTodo(userID);
    return todos;
  }

  static async updateTodo(
    todoId: number,
    userID: number,
    data: TodoCreationAttributes,
  ) {
    const todo = await TodoRepository.findByIdAndUser(todoId, userID);
    if (!todo) throw new TodoNotFoundError("Forbidden");

    await todo?.update({
      title: data.title,
      description: data.description,
    });

    return {
      id: todo.dataValues.id,
      title: todo.dataValues.title,
      description: todo.dataValues.description,
    };
  }

  static async deleteTodo(todoId: number, userID: number) {
    const wasDeleted = await TodoRepository.deleteByIdAndUser(todoId, userID);
    if (!wasDeleted) {
      throw new Error("Todo not found or Unauthorized");
    }

    return wasDeleted;
  }
}

export default TodoService;
