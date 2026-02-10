import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/response.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = err.message || "Internal Server Error";

  console.error(`❌ [SERVER ERROR]: ${message}`);
  // res.status(status).json({
  //   success: false,
  //   error: message,
  // });
  AppError(res, message);
};
