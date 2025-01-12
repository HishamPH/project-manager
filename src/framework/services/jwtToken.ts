import jwt, { TokenExpiredError, Secret } from "jsonwebtoken";
import IJwtToken from "../../usecase/interfaces/iJwtToken";

export default class JwtToken implements IJwtToken {
  async loginAccessToken(user: {}): Promise<string> {
    try {
      const token = jwt.sign(
        { ...user },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        {
          expiresIn: "30min",
        }
      );

      if (token) return token;
      return "";
    } catch (error) {
      console.log(error);

      return "";
    }
  }
  async loginRefreshToken(user: {}): Promise<string> {
    try {
      const token = jwt.sign(
        { ...user },
        process.env.REFRESH_TOKEN_SECRET as Secret,
        {
          expiresIn: "15d",
        }
      );

      if (token) return token;
      return "";
    } catch (error) {
      console.log(error);
      return "";
    }
  }
}
