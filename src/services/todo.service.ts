import { TodoCreationAttributes } from "../dtos/types/todo.type.js";
import { TodoTitleExistError } from "../exceptions/TodoError.js";
import TodoRepository from "../models/repositories/todo.repository.js";

class TodoService {
  static async createTodo(todo: TodoCreationAttributes) {
    const existTodo = await TodoRepository.findTitle(todo.title);
    if (existTodo) throw new TodoTitleExistError("Todo title already exist");
    return await TodoRepository.store(todo);
  }
}

export default TodoService;
