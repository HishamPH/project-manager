import { Request, Response, NextFunction } from "express";
import AuthUseCase from "../usecase/authUseCase";

export default class AuthController {
  private authUseCase: AuthUseCase;
  constructor(authUseCase: AuthUseCase) {
    this.authUseCase = authUseCase;
  }

  async signupUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("hello");
      const user = req.body;
      const result = await this.authUseCase.signupUser(user);
      if (result.accessToken && result.refreshToken) {
        res.cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.cookie("accessToken", result.accessToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }
      return res.status(result?.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.authUseCase.loginUser(email, password);
      if (result.accessToken && result.refreshToken) {
        res.cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.cookie("accessToken", result.accessToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }
      return res.status(result?.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
