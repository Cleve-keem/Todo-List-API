import { TodoCreationAttributes } from "../dtos/types/todo.type.js";
import {
  TodoNotFoundError,
  TodoTitleExistError,
} from "../exceptions/TodoError.js";
import TodoRepository from "../models/repositories/todo.repository.js";

class TodoService {
  static async createTodo(todo: TodoCreationAttributes) {
    const existTodo = await TodoRepository.findByTitle(todo.title);
    if (existTodo)
      throw new TodoTitleExistError("You already have a todo with this title");

    const result = await TodoRepository.store(todo);
    const data = result.dataValues;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
    };
  }

  static async getTodo(todoId: number, userId: number) {
    const todo = await TodoRepository.findByIdAndUser(todoId, userId);
    if (!todo) throw new TodoNotFoundError("Todo not found or access denied");

    return {
      id: todo.dataValues.id,
      title: todo.dataValues.title,
      description: todo.dataValues.description,
    };
  }

  static async getAllTodos(userId: number) {
    const todos = await TodoRepository.findAll(userId);
    return todos.map((todo) => {
      return {
        id: todo.dataValues.id,
        title: todo.dataValues.title,
        description: todo.dataValues.description,
      };
    });
  }

  static async updateTodo(
    todoId: number,
    userId: number,
    data: TodoCreationAttributes,
  ) {
    const todo = await TodoRepository.findByIdAndUser(todoId, userId);
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

  static async deleteTodo(todoId: number, userId: number) {
    const wasDeleted = await TodoRepository.deleteByIdAndUser(todoId, userId);
    if (!wasDeleted) {
      throw new Error("Todo not found or Unauthorized");
    }

    return wasDeleted;
  }
}

export default TodoService;
