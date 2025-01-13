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
  async getUserDetails(userId: number): Promise<ResponseType> {
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
  async updateUser(userId: number, user: UserEntity): Promise<ResponseType> {
    try {
      const result = await this.iUserRepository.updateUser(userId, user);
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

  async deleteUser(userId: number): Promise<ResponseType> {
    try {
      const result = await this.iUserRepository.deleteUser(userId);
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
