import {
  UserLoginType,
  UserRegistrationType,
} from "../dtos/types/user.type.js";
import { UserRepository } from "../models/repositories/user.repository.js";
import {
  UserAlreadyExitError,
  UserNotFoundError,
} from "../exceptions/UserErrors.js";
import bcrypt from "bcryptjs";
import { InvalidPasswordError } from "../exceptions/AuthError.js";

export default class UserService {
  static async registerUser(user: UserRegistrationType) {
    const exitingUser = await UserRepository.findUserByEmail(user.email);
    if (exitingUser) {
      throw new UserAlreadyExitError("User email already exist");
    }
    return await UserRepository.createAndSaveUser(user);
  }

  static async authenticateUser(loginDetails: UserLoginType) {
    const { email, password } = loginDetails;
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      throw new UserNotFoundError("No account found with this email!");
    }

    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) throw new InvalidPasswordError("Invalid credentials");

    return user.dataValues;
  }
}
