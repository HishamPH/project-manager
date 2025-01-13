import UserEntity from "../entity/userEntity";
import IUserRepsoitory from "./interfaces/iUserRepository";

interface ResponseType {
  id?: string;
  result?: UserEntity | {} | null;
  status: boolean;
  statusCode: number;
  message: string;
}

export default class UserUseCase {
  private iUserRepository: IUserRepsoitory;
  constructor(iUserRepository: IUserRepsoitory) {
    this.iUserRepository = iUserRepository;
  }
  async findUser(userId: string): Promise<ResponseType> {
    try {
      const result = await this.iUserRepository.findUserById(userId);
      return {
        status: true,
        statusCode: 200,
        message: "user found",
        result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }
}
