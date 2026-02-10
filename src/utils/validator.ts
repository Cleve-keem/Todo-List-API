import { UserType } from "../../dtos/types/user.type.js";
import { UserSchema } from "../../dtos/zod/user.zod.js";

const validateUser = (user: UserType) => {
  return UserSchema.safeParse(user);
};

export default validateUser;
