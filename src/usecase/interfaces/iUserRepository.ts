import UserEntity from "../../entity/userEntity";

export default interface IUserRepsoitory {
  findUserById(userId: string): Promise<{} | null>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
  createUser(user: UserEntity): Promise<UserEntity | null>;
  loginUser(hash: string, password: string): Promise<boolean>;
}
