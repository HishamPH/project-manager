import UserEntity from "../../entity/userEntity";

export default interface IUserRepsoitory {
  findUserById(userId: number): Promise<{} | null>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
  createUser(user: UserEntity): Promise<UserEntity | null>;
  updateUser(userId: number, user: UserEntity): Promise<UserEntity | null>;
  deleteUser(userId: number): Promise<number>;
  loginUser(hash: string, password: string): Promise<boolean>;
}
