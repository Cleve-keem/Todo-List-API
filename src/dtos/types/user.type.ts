import z from "zod";
import { UserRegisterSchema } from "../zod/user.zod.js";

export type UserType = z.infer<typeof UserRegisterSchema>;
