import { UserType } from "../../models/types/user.type.js";
import { UserSchema } from "../../models/zod/user.zod.js";

const validateUser = (user: UserType) => {
  return UserSchema.safeParse(user);
};

export default validateUser;
