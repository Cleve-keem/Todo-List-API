import { Users } from "../schema/user.schema.js";
import { UserType } from "../../dtos/types/user.type.js";

export class UserRepository {
  // create and save
  static async createAndSaveUser(user: UserType): Promise<any> {
    return await Users.create(user);
  }

  static async findUserEmail(emailAddress: string) {
    return await Users.findOne({ where: { email: emailAddress } });
  }

  static async findUserId(id: number) {
    return await Users.findByPk(id);
  }
}
