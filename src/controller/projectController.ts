import { Request, Response, NextFunction } from "express";
import ProjectUseCase from "../usecase/projectUseCase";

/**
 * @swagger
 * /project/add-user:
 *   post:
 *     summary: Add user to project
 *     description: Adds a user to the specified project.
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 2
 *             required:
 *               - projectId
 *               - userId
 *     responses:
 *       200:
 *         description: User successfully added to project
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized access (if no valid token is provided)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /project/{id}:
 *   get:
 *     summary: Get project details
 *     description: Fetches the details of a project by its ID.
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project
 *     responses:
 *       200:
 *         description: Project details successfully fetched
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
 *                   example: "Project Name"
 *                 description:
 *                   type: string
 *                   example: "Project description"
 *                 ownerId:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Unauthorized access (if no valid token is provided)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /create-project:
 *   post:
 *     summary: Create a new project
 *     description: Allows the user to create a new project.
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
 *                 example: "New Project"
 *               description:
 *                 type: string
 *                 example: "Project description"
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Project successfully created
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
 *                   example: "New Project"
 *                 description:
 *                   type: string
 *                   example: "Project description"
 *                 ownerId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized access (if no valid token is provided)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /edit-project/{id}:
 *   put:
 *     summary: Edit project details
 *     description: Allows the user to update the details of an existing project.
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Project Name"
 *               description:
 *                 type: string
 *                 example: "Updated project description"
 *     responses:
 *       200:
 *         description: Project details successfully updated
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
 *                   example: "Updated Project Name"
 *                 description:
 *                   type: string
 *                   example: "Updated project description"
 *                 ownerId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized access (if no valid token is provided)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /delete-project/{id}:
 *   delete:
 *     summary: Delete a project
 *     description: Allows the user to delete a project by its ID.
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project to delete
 *     responses:
 *       200:
 *         description: Project successfully deleted
 *       401:
 *         description: Unauthorized access (if no valid token is provided)
 *       500:
 *         description: Internal server error
 */

export default class ProjectController {
  private projectUseCase: ProjectUseCase;
  constructor(projectUseCase: ProjectUseCase) {
    this.projectUseCase = projectUseCase;
  }

  async addProjectUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, projectId } = req.body;

      //  return res.status(project?.statusCode).json({ ...project });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectId = req.params.id as unknown;
      const project = await this.projectUseCase.getProject(projectId as number);
      return res.status(project?.statusCode).json({ ...project });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id as number;
      const project = req.body;
      const result = await this.projectUseCase.createProject(project, userId);
      return res.status(result?.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async editProject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id as number;
      const projectId = req.params.id as unknown;
      const project = req.body;
      const result = await this.projectUseCase.editProject(
        userId,
        projectId as number,
        project
      );
      return res.status(result?.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id as number;
      const projectId = req.params.id as unknown;
      const result = await this.projectUseCase.deleteProject(
        projectId as number,
        userId
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
