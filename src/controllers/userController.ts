import { Request, Response } from "express";
import validateUser from "../utils/validator.js";
import { formatValidationError } from "../utils/formatter.js";
import { AppError, errorResponse, successResponse } from "../utils/response.js";
import UserService from "../services/user.service.js";
import { generateAccessToken } from "../utils/token.js";

export default class UserController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { data, error } = await validateUser(req.body);
      if (error) {
        const errorMessages = formatValidationError(error);
        return errorResponse(res, 400, "validation error", errorMessages);
      }

      const newUser = await UserService.registerUser(data);
      // generate token
      const userAccessToken = generateAccessToken(newUser.id);
      return successResponse(res, 201, "New user created successfully!", {
        token: userAccessToken,
      });
    } catch (error: any) {
      console.error("❌ [Registration Error]:", error.message);
      if (error.message.includes("email already exist")) {
        return errorResponse(res, error.code, error.message);
      }
      console.log(error);
      return AppError(res, error.message);
    }
  }
  static async loginUser(req: Request, res: Response) {
    
  }
}
