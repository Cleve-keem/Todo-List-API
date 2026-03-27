import z from "zod";
import { UserLoginSchema, UserRegisterSchema } from "../zod/user.zod.js";
import { Optional } from "sequelize";

// Auth types
export interface UserAttributes extends z.infer<typeof UserRegisterSchema> {
  id: number;
}

export type UserRegistrationAttributes = Optional<UserAttributes, "id">;
export type UserLoginType = z.infer<typeof UserLoginSchema>;
