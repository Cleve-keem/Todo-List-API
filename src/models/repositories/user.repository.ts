import { Users } from "../schema/user.schema.js";
import { UserRegistrationType } from "../../dtos/types/user.type.js";

export class UserRepository {
  // create and save
  static async createAndSaveUser(user: UserRegistrationType): Promise<any> {
    return await Users.create(user);
  }

  static async findUserByEmail(emailAddress: string) {
    return await Users.findOne({ where: { email: emailAddress } });
  }

  static async findUserById(id: number) {
    return await Users.findByPk(id);
  }
}
