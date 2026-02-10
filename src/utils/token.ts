import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { AuthError } from "../exceptions/AuthError.js";

const { JsonWebTokenError, TokenExpiredError } = jwt;
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("❌ MISSING JWT_SECRET in .env file!");
}

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string, password: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err: any) {
    console.log("❌ [Token verification]:", err.message);
    if (err instanceof TokenExpiredError) {
      throw new AuthError("Session expired, please login again", 401);
    }
    if (err instanceof JsonWebTokenError) {
      throw new AuthError("Invalid token signature", 401);
    }
    throw new AuthError("Authentication failed", 401);
  }
};
