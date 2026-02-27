import { TodoCreationAttributes } from "../dtos/types/todo.type.js";
import { AuthError } from "../exceptions/AuthError.js";
import { TodoTitleExistError } from "../exceptions/TodoError.js";
import TodoRepository from "../models/repositories/todo.repository.js";

class TodoService {
  static async createTodo(todo: TodoCreationAttributes) {
    try {
      const existTodo = await TodoRepository.findTitle(todo.title);
      if (existTodo) throw new TodoTitleExistError("Todo title already exist");

      const newTodo = await TodoRepository.store(todo);
      const { id, title, description } = newTodo.dataValues;
      return { id, title, description };
    } catch (error) {
      if (error instanceof AuthError) {
        throw new AuthError(error.message);
      }
      throw error;
    }
  }

  static async getTodos(userId: number) {
    try {
      const todos = await TodoRepository.getAllTodo(userId);
      return todos.map((todo) => {
        const { id, title, description, createdAt, updatedAt } =
          todo.dataValues;
        return { id, title, description, createdAt, updatedAt };
      });
    } catch (error) {
      if (error instanceof AuthError) {
        throw new AuthError(error.message);
      }
      throw error;
    }
  }
}

export default TodoService;
