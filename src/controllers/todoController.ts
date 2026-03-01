import { Request, Response } from "express";
import { AuthRequest } from "../dtos/types/express.js";
import TodoService from "../services/todo.service.js";
import { AppError, errorResponse, successResponse } from "../utils/response.js";
import { TodoTitleExistError } from "../exceptions/TodoError.js";
import { AuthError } from "../exceptions/AuthError.js";
import { validateTodoData } from "../utils/validator.js";
import { formatTodoError } from "../utils/formatter.js";
import { TodoCreationAttributes } from "../dtos/types/todo.type.js";

class TodoController {
  static async createTodo(req: AuthRequest, res: Response) {
    try {
      const userID = req.user?.userId;
      const { data, error } = await validateTodoData(req.body);
      if (error) {
        const errorMessages = formatTodoError(error);
        return errorResponse(res, 400, "validation Error", errorMessages);
      }

      const todoData = { ...data, userID } as TodoCreationAttributes;
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

  static async updateTodo(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { data, error } = await validateTodoData(req.body);
      if (error) {
        const errorMessages = await formatTodoError(error);
        return errorResponse(res, 400, "Validation Error", errorMessages);
      }

      const todo = await TodoService.updateTodo(
        Number(id),
        data as TodoCreationAttributes,
      );
      console.log(todo);
    } catch (error) {}
  }

  static async fetchOneTodo(req: Request, res: Response) {
    const id = req.params.id as string;
    try {
      const todo = await TodoService.getTodo(Number(id));
      return successResponse(res, 200, "fetched Todo", todo);
    } catch (error) {
      return AppError(res);
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
      return AppError(res, error.message);
    }
  }

  static async deleteTodo(req: Request, res: Response) {}
}

export default TodoController;
