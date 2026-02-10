import z from "zod";
import { UserLoginSchema, UserRegisterSchema } from "../zod/user.zod.js";

// Auth types
export type UserRegistrationType = z.infer<typeof UserRegisterSchema>;
export type UserLoginType = z.infer<typeof UserLoginSchema>;
