import { UserType } from "../models/types/user.type.js";
import { UserRepository } from "../repositories/user.reposity.js";
import { UserAlreadyExitError } from "../utils/expections/UserErrors.js";

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

  static async findUserByEmail(userEemailAddress: string) {
    return await UserRepository.findUserEmail(userEemailAddress);
  }
}
