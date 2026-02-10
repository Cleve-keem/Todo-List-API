import {
  UserLoginType,
  UserRegistrationType,
} from "../dtos/types/user.type.js";
import { UserLoginSchema, UserRegisterSchema } from "../dtos/zod/user.zod.js";

export const validateUserRegistrationDetails = async (
  user: UserRegistrationType,
) => {
  return await UserRegisterSchema.safeParseAsync(user);
};

export const validateUserLoginDetails = async (
  userLoginDetails: UserLoginType,
) => {
  return await UserLoginSchema.safeParseAsync(userLoginDetails);
};
