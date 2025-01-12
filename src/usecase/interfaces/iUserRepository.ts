import UserEntity from "../../entity/userEntity";

export default interface IUserRepsoitory {
  findUser(userId: string): Promise<{} | null>;
}
