import { Request, Response } from "express";
import { AppError, errorResponse, successResponse } from "../utils/response.js";
import UserService from "../services/user.service.js";
import { generateAccessToken } from "../utils/token.js";
import {
  validateUserLoginDetails,
  validateUserRegistrationDetails,
} from "../utils/validator.js";
import {
  formatUserLoginValidationError,
  formatUserRegistrationValidationError,
} from "../utils/formatter.js";

export default class UserController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { data, error } = await validateUserRegistrationDetails(req.body);
      if (error) {
        const errorMessages = formatUserRegistrationValidationError(error);
        return errorResponse(res, 400, "validation Error", errorMessages);
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
        return errorResponse(res, error.statusCode, error.message);
      }
      return AppError(res, error.message);
    }
  }
  static async loginUser(req: Request, res: Response) {
    try {
      const { data, error } = await validateUserLoginDetails(req.body);
      if (error) {
        const errorMessage = formatUserLoginValidationError(error);
        return errorResponse(res, 400, "Validation Error", errorMessage);
      }
      const user = await UserService.authenticateUser(data);
      // generate token
      const token = generateAccessToken(user.id);
      return successResponse(res, 200, "User Logged in successfully!", {
        token,
      });
    } catch (error: any) {
      console.log("[Validation Error]", error.message);
      if (error.message.includes("No account found")) {
        return errorResponse(res, error.statusCode, error.message);
      }
      if (error.message.includes("Invalid credentials")) {
        return errorResponse(res, error.statusCode, error.message);
      }
      return AppError(res, error.message);
    }
  }
}
