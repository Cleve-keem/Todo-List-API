import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  payload?: unknown,
  key: string = "data",
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    [key]: payload,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: any,
) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};

export const InternalServerErrorResponse = (
  res: Response,
  errorMessage?: any,
) => {
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: errorMessage,
  });
};
