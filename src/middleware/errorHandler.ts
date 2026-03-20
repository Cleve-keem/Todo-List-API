import { NextFunction, Request, Response } from "express";
import { AppError, errorResponse } from "../utils/response.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 1. Log the error for the developers (you)
  console.error(`❌ [ERROR]: ${err.name} - ${err.message}`);

  // 2. Check if it's one of OUR custom errors
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  // 3. Send a clean JSON response (No more HTML!)
  return errorResponse(res, statusCode, message);
};
