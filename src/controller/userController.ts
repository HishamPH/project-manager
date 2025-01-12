import { Request, Response, NextFunction } from "express";
import UserUseCase from "../usecase/userUseCase";
export default class UserController {
  private userUseCase: UserUseCase;
  constructor(userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;
  }
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
