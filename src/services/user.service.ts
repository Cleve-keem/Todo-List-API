import {
  UserLoginType,
  UserRegistrationAttributes,
} from "../dtos/types/user.type.js";
import { UserRepository } from "../models/repositories/user.repository.js";
import {
  UserAlreadyExitError,
  UserNotFoundError,
} from "../exceptions/UserErrors.js";
import bcrypt from "bcryptjs";
import { InvalidPasswordError } from "../exceptions/AuthError.js";
import { generateAccessToken } from "../utils/token.js";

export default class UserService {
  static async registerUser(data: UserRegistrationAttributes) {
    data.email = data.email.toLowerCase(); // convert email to lower case

    const exitingUser = await UserRepository.findUserByEmail(data.email);
    if (exitingUser) throw new UserAlreadyExitError("Email already in use");
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    // Create and save user
    const result = await UserRepository.createAndSaveUser({
      ...data,
      password: hashedPassword,
    });

    const user = result.dataValues;
    return {
      token: generateAccessToken(user.id),
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      },
    };
  }

  static async authenticateUser({ email, password }: UserLoginType) {
    const data = await UserRepository.findUserByEmail(email.toLowerCase());
    if (!data) throw new UserNotFoundError("User not found");

    const isMatch = await bcrypt.compare(password, data.dataValues.password);
    if (!isMatch) throw new InvalidPasswordError("Invalid credentials");

    const user = data.dataValues;
    return {
      token: generateAccessToken(user.id),
      user: { id: user.id, email: user.email },
    };
  }
}
