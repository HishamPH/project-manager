import UserEntity from "../../entity/userEntity";
import IUserRepsoitory from "../../usecase/interfaces/iUserRepository";
import User from "../database/models/userModel";

export default class UserRepository implements IUserRepsoitory {
  async findUser(userId: string): Promise<{} | null> {
    try {
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
