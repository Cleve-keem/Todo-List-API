import { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response.js";
import UserService from "../services/user.service.js";

export default class UserController {
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.registerUser(req.body);
      return successResponse(res, 201, "New user created successfully!", {
        token: result.token,
      });
    } catch (error: any) {
      console.error("❌[Registration Error]:", error.message);
      next(error);
    }
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.authenticateUser(req.body);
      return successResponse(res, 200, "User Logged in successfully!", {
        token: result.token,
      });
    } catch (error: any) {
      console.log("❌[Login error]:", error.message);
      next(error);
    }
  }
}
