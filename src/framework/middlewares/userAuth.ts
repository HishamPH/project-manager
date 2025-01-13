import { NextFunction, Request, Response } from "express";
import jwt, {
  Secret,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import JwtTokenService from "../services/jwtToken";

const jwtToken = new JwtTokenService();

interface DecodedToken {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user: DecodedToken | null;
    }
  }
}

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    // if (!accessToken) {
    //   throw new TokenExpiredError("access Token expires", new Date());
    // }
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
          res.status(401).json({
            message: "Refresh Token not Available",
            tokenExpired: true,
          });
        }
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET as Secret
        ) as DecodedToken;
        const { id, email } = decoded;

        const newAccessToken = await jwtToken.loginAccessToken({ id, email });
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        req.user = decoded;
        console.log("this is the code for refreshing the accessToken", decoded);
        next();
      } catch (error) {
        console.log(error);
        if (error instanceof TokenExpiredError) {
          res.status(401).json({
            message: "RefreshToken Expired Login again",
            tokenExpired: true,
          });
        } else if (error instanceof JsonWebTokenError) {
          res.status(401).json({
            message: "wrong refresh Token",
            tokenExpired: true,
          });
        }
      }
    } else if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        message: "wrong access Token",
        tokenExpired: true,
      });
    } else {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        tokenExpired: true,
      });
    }
  }
};

export default userAuth;
