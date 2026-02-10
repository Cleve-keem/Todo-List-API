import { UserType } from "../dtos/types/user.type.js";
import { UserRegisterSchema } from "../dtos/zod/user.zod.js";

const validateUser = async (user: UserType) => {
  return await UserRegisterSchema.safeParseAsync(user);
};

export default validateUser;
