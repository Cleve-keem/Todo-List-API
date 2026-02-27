import { UserModel } from "../schema/user.schema.js";
import { UserRegistrationType } from "../../dtos/types/user.type.js";

export class UserRepository {
  // create and save
  static async createAndSaveUser(user: UserRegistrationType): Promise<any> {
    return await UserModel.create(user);
  }

  static async findUserByEmail(emailAddress: string) {
    return await UserModel.findOne({ where: { email: emailAddress } });
  }

  static async findUserById(id: number) {
    return await UserModel.findByPk(id);
  }
}
