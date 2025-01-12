import UserEntity from "../../entity/userEntity";
export default interface IJwtToken {
  loginAccessToken(user: {}): Promise<string>;
  loginRefreshToken(user: {}): Promise<string>;
}
