import { UserType } from "../dtos/types/user.type.js";
import { UserRepository } from "../models/repositories/user.repository.js";
import { UserAlreadyExitError } from "../exceptions/UserErrors.js";

export default class UserService {
  static async registerUser(user: UserType) {
    const exitingUser = await this.findUserByEmail(user.email);
    if (exitingUser) {
      throw new UserAlreadyExitError("User email already exist");
    }
    return await UserRepository.createAndSaveUser(user);
  }

  static async findUserById(userId: number) {
    return await UserRepository.findUserId(userId);
  }

  static async findUserByEmail(userEmail: string) {
    return await UserRepository.findUserEmail(userEmail);
  }
}
