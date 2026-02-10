import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  payload?: unknown,
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    response: payload,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors: any = null,
) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};

export const AppError = (res: Response, errorMessage?: any) => {
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: errorMessage,
  });
};
