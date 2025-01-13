import { Request, Response, NextFunction } from "express";
import AuthUseCase from "../usecase/authUseCase";

export default class AuthController {
  private authUseCase: AuthUseCase;
  constructor(authUseCase: AuthUseCase) {
    this.authUseCase = authUseCase;
  }

  /**
   * @swagger
   * /signup:
   *   post:
   *     summary: User signup
   *     description: Registers a new user and returns access and refresh tokens.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *             required:
   *               - email
   *               - password
   *     responses:
   *       200:
   *         description: User successfully signed up, with tokens set in cookies.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *                   example: "access_token_example"
   *                 refreshToken:
   *                   type: string
   *                   example: "refresh_token_example"
   *       400:
   *         description: Bad Request (e.g., missing fields)
   *       500:
   *         description: Internal server error
   */

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

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: User login
   *     description: Logs in a user and returns access and refresh tokens.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *             required:
   *               - email
   *               - password
   *     responses:
   *       200:
   *         description: User successfully logged in, with tokens set in cookies.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *                   example: "access_token_example"
   *                 refreshToken:
   *                   type: string
   *                   example: "refresh_token_example"
   *       400:
   *         description: Invalid credentials
   *       500:
   *         description: Internal server error
   */

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

  /**
   * @swagger
   * /logout:
   *   post:
   *     summary: User logout
   *     description: Logs out a user by clearing the cookies.
   *     responses:
   *       200:
   *         description: Successfully logged out, cookies cleared.
   *       500:
   *         description: Internal server error
   */

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("logout");
      req.user = null;
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "User LogOut success fully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
