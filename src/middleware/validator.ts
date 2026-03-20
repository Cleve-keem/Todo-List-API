import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import { errorResponse } from "../utils/response.js";

export const validate = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.reduce((acc: any, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        }, {});

        return errorResponse(res, 400, "Validation Failed", formattedErrors);
      }
      next(error);
    }
  };