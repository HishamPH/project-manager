import { Request, Response, NextFunction } from "express";
import UserUseCase from "../usecase/userUseCase";

/**
 * @swagger
 * /details:
 *   get:
 *     summary: Get user details
 *     description: Fetches the details of the logged-in user.
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: User details successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 createdAt:
 *                   type: string
 *                   example: "2025-01-01T00:00:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   example: "2025-01-10T00:00:00.000Z"
 *       401:
 *         description: Unauthorized access (if no valid token is provided)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /edit:
 *   put:
 *     summary: Edit user details
 *     description: Allows the logged-in user to update their details (e.g., name, email).
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 example: "janedoe@example.com"
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: User details successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Jane Doe"
 *                 email:
 *                   type: string
 *                   example: "janedoe@example.com"
 *                 updatedAt:
 *                   type: string
 *                   example: "2025-01-13T00:00:00.000Z"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized access (if no valid token is provided)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete user account
 *     description: Allows the logged-in user to delete their account permanently.
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       401:
 *         description: Unauthorized access (if no valid token is provided)
 *       500:
 *         description: Internal server error
 */

export default class UserController {
  private userUseCase: UserUseCase;
  constructor(userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;
  }

  async getUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const result = await this.userUseCase.getUserDetails(userId as number);
      return res.status(result?.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const user = req.body;
      const result = await this.userUseCase.updateUser(userId as number, user);
      return res.status(result?.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const result = await this.userUseCase.deleteUser(userId as number);
      return res.status(result?.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
