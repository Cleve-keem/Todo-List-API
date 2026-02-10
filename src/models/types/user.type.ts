import z from "zod";
import { UserSchema } from "../zod/user.zod.js";

export type UserType = z.infer<typeof UserSchema>;
