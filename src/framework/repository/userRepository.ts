import UserEntity from "../../entity/userEntity";
import IUserRepsoitory from "../../usecase/interfaces/iUserRepository";
import { User } from "../database/models";
import bcrypt from "bcryptjs";

export default class UserRepository implements IUserRepsoitory {
  async findUserById(userId: string): Promise<{} | null> {
    try {
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async findUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) return user;
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async createUser(user: UserEntity): Promise<UserEntity | null> {
    try {
      let { name, email, password } = user;
      password = await bcrypt.hash(password, 10);

      const userData = await User.create({ name, email, password });
      const data = userData.toJSON();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async loginUser(hash: string, password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
