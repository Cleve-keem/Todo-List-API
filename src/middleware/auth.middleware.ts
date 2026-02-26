import { NextFunction, Response } from "express";
import { AuthRequest } from "../dtos/types/express.js";
import { AuthError } from "../exceptions/AuthError.js";
import { verifyToken } from "../utils/token.js";
import { UserRepository } from "../models/repositories/user.repository.js";

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers?.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new AuthError("Unauthorized.");
    }

    const decoded = verifyToken(token) as { userId: number };
    const userExists = await UserRepository.findUserById(decoded.userId);

    if (!userExists) throw new AuthError("User no longer exists", 401);
    req.user = { userId: decoded.userId };

    next();
  } catch (error: any) {
    next(error);
  }
};
