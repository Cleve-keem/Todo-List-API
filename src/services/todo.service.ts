import { TodoCreationAttributes } from "../dtos/types/todo.type.js";
import {
  TodoNotFoundError,
  TodoTitleExistError,
} from "../exceptions/TodoError.js";
import { client } from "../lib/redisClient.js";
import TodoRepository from "../models/repositories/todo.repository.js";

class TodoService {
  static async createTodo(todo: TodoCreationAttributes) {
    const existTodo = await TodoRepository.findByTitle(
      todo.title,
      todo.userID!,
    );
    if (existTodo)
      throw new TodoTitleExistError("You already have a todo with this title");
    
    // Clear cache
    const keys = await client.keys(`todos:user:${todo.userID}:*`);
    if (keys.length > 0) {
      console.log(
        `🧹 [Redis]: Cleared ${keys.length} cache keys for user ${todo.userID}`,
      );
      await client.del(keys);
    }

    const result = await TodoRepository.store(todo);
    return {
      id: result.dataValues.id,
      title: result.dataValues.title,
      description: result.dataValues.description,
    };
  }

  static async getTodo(todoId: number, userID: number) {
    const cacheKey = `todo:user:${userID}:todo:${todoId}`;
    const cachedTodo = await client.get(cacheKey);
    if (cachedTodo) {
      console.log("🚀 [Redis]: Serving todos from cache");
      return JSON.parse(cachedTodo);
    }

    const todo = await TodoRepository.findByIdAndUser(todoId, userID);
    if (!todo) throw new TodoNotFoundError("Todo not found or access denied");

    // Cache todo
    await client.set(cacheKey, JSON.stringify(todo), { EX: 600 });
    return todo;
  }

  static async getAllTodos(userID: number, page: number, limit: number) {
    const todoCacheKey = `todos:user:${userID}:page:${page}:limit:${limit}`;
    const cachedTodos = await client.get(todoCacheKey);
    if (cachedTodos) {
      console.log("🚀 [Redis]: Serving todos from cache");
      const data = JSON.parse(cachedTodos);

      return {
        data,
        page,
        limit,
        total: data.length,
      };
    }

    const offset = (page - 1) * limit;
    const todos = await TodoRepository.findAllUserTodo(userID, limit, offset);
    // Cache data
    await client.set(todoCacheKey, JSON.stringify(todos), { EX: 600 });
    return { data: todos, page, limit, total: todos.length };
  }

  static async updateTodo(
    todoId: number,
    userID: number,
    data: TodoCreationAttributes,
  ) {
    const todo = await TodoRepository.findByIdAndUser(todoId, userID);
    if (!todo) throw new TodoNotFoundError("Forbidden");

    // Clear cache
    const keys = await client.keys(`todos:user:${userID}:*`);
    if (keys.length > 0) {
      console.log(
        `🧹 [Redis]: Cleared ${keys.length} cache keys for user ${userID}`,
      );
      await client.del(keys);
    }

    await client.del(`todo:user:${userID}:todo:${todoId}`);

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

    // Clear cache
    const keys = await client.keys(`todos:user:${userID}:*`);
    if (keys.length > 0) {
      console.log(
        `🧹 [Redis]: Cleared ${keys.length} cache keys for user ${userID}`,
      );
      await client.del(keys);
    }
    await client.del(`todo:user:${userID}:todo:${todoId}`);

    return wasDeleted;
  }
}

export default TodoService;
