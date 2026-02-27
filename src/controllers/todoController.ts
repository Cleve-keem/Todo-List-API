import { Request, Response } from "express";
import { AuthRequest } from "../dtos/types/express.js";
import TodoService from "../services/todo.service.js";
import { AppError, errorResponse, successResponse } from "../utils/response.js";
import { TodoTitleExistError } from "../exceptions/TodoError.js";
import { AuthError } from "../exceptions/AuthError.js";

class TodoController {
  static async createTodo(req: AuthRequest, res: Response) {
    try {
      const userID = req.user?.userId;
      const todoData = { ...req.body, userID };
      // create todo
      const result = await TodoService.createTodo(todoData);
      return successResponse(res, 201, "Todo created successfully!", result);
    } catch (error: any) {
      console.log("❌[Create todo error]:", error.message);
      if (error instanceof TodoTitleExistError) {
        return errorResponse(res, 409, error.message);
      }
      return AppError(res, error.message);
    }
  }

  static async updateTodo(req: Request, res: Response) {}
  static async deleteTodo(req: Request, res: Response) {}

  static async getTodos(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId as number;
      const todos = await TodoService.getTodos(userId);
      return successResponse(res, 200, "fetched user todos", todos);
    } catch (error: any) {
      console.log("[Get todos controller error]:", error.message);
      if (error instanceof AuthError) {
        return errorResponse(res, 401, error.message);
      }
      return AppError(res, error.message);
    }
  }
}

export default TodoController;
