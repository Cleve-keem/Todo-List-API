import { NextFunction, Response } from "express";
import { AuthRequest } from "../dtos/types/express.js";
import TodoService from "../services/todo.service.js";
import { successResponse } from "../utils/response.js";
import { TodoCreationAttributes } from "../dtos/types/todo.type.js";

class TodoController {
  static async createTodo(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userID = req.user?.userId;
      const result = await TodoService.createTodo({
        ...req.body,
        userID,
      });
      return successResponse(res, 201, "Todo created successfully!", result);
    } catch (error: any) {
      console.log("❌ [createTodo controller]:", error.message);
      next(error);
    }
  }

  static async updateTodo(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const userID = req.user?.userId as number;

      const updatedTodo = await TodoService.updateTodo(
        id,
        userID,
        req.body as TodoCreationAttributes,
      );
      return successResponse(
        res,
        201,
        "Todo updated successfully!",
        updatedTodo,
      );
    } catch (error: any) {
      console.log("❌ [updateTodo controller]:", error.message);
      next(error);
    }
  }

  static async fetchOneTodo(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const id = Number(req.params.id);
    const userID = req.user?.userId as number;
    try {
      const todo = await TodoService.getTodo(id, userID);
      return successResponse(res, 200, "fetched Todo", todo);
    } catch (error: any) {
      console.error("❌ [featchOneTodo controller]:", error.message);
      next(error);
    }
  }

  static async fetchAllTodos(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userID = req.user?.userId as number;
      const todos = await TodoService.getAllTodos(userID);
      return successResponse(res, 200, "fetched user todos", todos);
    } catch (error: any) {
      console.log("❌ [fetchAllTodos controller]:", error.message);
      next(error);
    }
  }

  static async deleteTodo(req: AuthRequest, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const userID = req.user?.userId as number;
    try {
      await TodoService.deleteTodo(id, userID);
      return successResponse(res, 204, "Todo deleted successfully");
    } catch (error: any) {
      console.log("❌ [deleteTodo controller]:", error.message);
      next(error);
    }
  }
}

export default TodoController;
