import { Request, Response } from "express";
import { AuthRequest } from "../dtos/types/express.js";

class TodoController {
  static async createTodo(req: AuthRequest, res: Response) {
    const userId = req.user?.userId;
    const todoData = { ...req.body, authorUserId: userId };

    
  }
  static async updateTodo(req: Request, res: Response) {}
  static async deleteTodo(req: Request, res: Response) {}
  static async getTodos(req: Request, res: Response) {}
}

export default TodoController;
