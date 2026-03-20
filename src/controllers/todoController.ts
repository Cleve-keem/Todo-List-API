import { Request, Response } from "express";
import { AuthRequest } from "../dtos/types/express.js";
import TodoService from "../services/todo.service.js";
import {
  InternalServerErrorResponse,
  errorResponse,
  successResponse,
} from "../utils/response.js";
import {
  TodoNotFoundError,
  TodoTitleExistError,
} from "../exceptions/TodoError.js";
import { AuthError } from "../exceptions/AuthError.js";
import { TodoCreationAttributes } from "../dtos/types/todo.type.js";

class TodoController {
  static async createTodo(req: AuthRequest, res: Response) {
    try {
      const userID = req.user?.userId;

      const todoData = { ...req.body, userID } as TodoCreationAttributes;
      // create todo
      const result = await TodoService.createTodo(todoData);
      return successResponse(res, 201, "Todo created successfully!", result);
    } catch (error: any) {
      console.log("❌[Create todo error]:", error.message);
      if (error instanceof TodoTitleExistError) {
        return errorResponse(res, 409, error.message);
      }
      return InternalServerErrorResponse(res, error.message);
    }
  }

  static async updateTodo(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const updatedTodo = await TodoService.updateTodo(
        Number(id),
        req.body as TodoCreationAttributes,
      );
      return successResponse(
        res,
        201,
        "Todo updated successfully!",
        updatedTodo,
      );
    } catch (error: any) {
      console.log(error.message);
      return InternalServerErrorResponse(res, error.message);
    }
  }

  static async fetchOneTodo(req: Request, res: Response) {
    const id = req.params.id as string;
    try {
      const todo = await TodoService.getTodo(Number(id));
      return successResponse(res, 200, "fetched Todo", todo);
    } catch (error) {
      return InternalServerErrorResponse(res);
    }
  }

  static async fetchAllTodos(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId as number;
      const todos = await TodoService.getAllTodos(userId);
      return successResponse(res, 200, "fetched user todos", todos);
    } catch (error: any) {
      console.log("[Get todos controller error]:", error.message);
      if (error instanceof AuthError) {
        return errorResponse(res, 401, error.message);
      }
      return InternalServerErrorResponse(res, error.message);
    }
  }

  static async deleteTodo(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await TodoService.deleteTask(id);
      return successResponse(res, 204, "Todo deleted successfully");
    } catch (error: any) {
      console.log("❌[Delete todo error]:", error.message);
      if (error instanceof TodoNotFoundError) {
        return errorResponse(res, 404, error.message);
      }
      return InternalServerErrorResponse(res, error.message);
    }
  }
}

export default TodoController;
