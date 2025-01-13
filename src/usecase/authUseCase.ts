import UserEntity from "../entity/userEntity";
import IUserRepsoitory from "./interfaces/iUserRepository";
import IJwtToken from "./interfaces/iJwtToken";

interface ResponseType {
  id?: number;
  result?: UserEntity | {} | null;
  status: boolean;
  statusCode: number;
  message: string;
  accessToken?: string;
  refreshToken?: string;
}

export default class AuthUseCase {
  private iUserRepository: IUserRepsoitory;
  private iJwtToken: IJwtToken;
  constructor(iUserRepository: IUserRepsoitory, iJwtToken: IJwtToken) {
    this.iUserRepository = iUserRepository;
    this.iJwtToken = iJwtToken;
  }
  async signupUser(user: UserEntity): Promise<ResponseType> {
    try {
      const exist = await this.iUserRepository.findUserByEmail(user.email);
      if (exist) {
        return {
          status: false,
          statusCode: 409,
          message: "user already exists",
        };
      }
      const result = await this.iUserRepository.createUser(user);
      if (result) {
        const accessToken = await this.iJwtToken.loginAccessToken({
          id: result.id,
          email: result.email,
        });
        const refreshToken = await this.iJwtToken.loginRefreshToken({
          id: result.id,
          email: result.email,
        });
        return {
          result,
          status: true,
          statusCode: 200,
          message: "new user created",
          accessToken,
          refreshToken,
        };
      }
      return {
        status: false,
        statusCode: 405,
        message: "database error in creating user",
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

  async loginUser(email: string, password: string): Promise<ResponseType> {
    try {
      const exist = await this.iUserRepository.findUserByEmail(email);
      if (!exist) {
        return {
          status: false,
          statusCode: 404,
          message: "user does not exist",
        };
      }
      let isValid = await this.iUserRepository.loginUser(
        exist.password,
        password
      );
      if (!isValid) {
        return {
          status: false,
          statusCode: 401,
          message: "wrong password",
        };
      }
      const accessToken = await this.iJwtToken.loginAccessToken({
        id: exist.id,
        email: exist.email,
      });
      const refreshToken = await this.iJwtToken.loginRefreshToken({
        id: exist.id,
        email: exist.email,
      });
      return {
        status: true,
        statusCode: 200,
        message: "logged in successfully!",
        accessToken,
        refreshToken,
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
