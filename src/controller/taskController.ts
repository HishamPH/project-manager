import { Request, Response, NextFunction } from "express";
import TaskUseCase from "../usecase/taskUseCase";

/**
 * @swagger
 * /project/{id}/tasks:
 *   get:
 *     summary: Get all tasks by project ID
 *     description: Fetches all tasks associated with a specific project.
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project to fetch tasks for
 *     responses:
 *       200:
 *         description: List of tasks for the project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   projectId:
 *                     type: integer
 *       401:
 *         description: Unauthorized access (if no valid token is provided)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /get-task/{id}:
 *   get:
 *     summary: Get task by ID
 *     description: Fetches the details of a specific task by its ID.
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to fetch
 *     responses:
 *       200:
 *         description: Task details successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 projectId:
 *                   type: integer
 *       401:
 *         description: Unauthorized access (if no valid token is provided)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /create-task:
 *   post:
 *     summary: Create a new task
 *     description: Allows the user to create a new task.
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Task"
 *               description:
 *                 type: string
 *                 example: "Task description"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *               projectId:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - title
 *               - projectId
 *     responses:
 *       201:
 *         description: Task successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "New Task"
 *                 description:
 *                   type: string
 *                   example: "Task description"
 *                 status:
 *                   type: string
 *                   example: "Pending"
 *                 projectId:
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
 * /edit-task/{id}:
 *   put:
 *     summary: Edit task details
 *     description: Allows the user to update the details of an existing task.
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Task Title"
 *               description:
 *                 type: string
 *                 example: "Updated task description"
 *               status:
 *                 type: string
 *                 example: "In Progress"
 *     responses:
 *       200:
 *         description: Task details successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Updated Task Title"
 *                 description:
 *                   type: string
 *                   example: "Updated task description"
 *                 status:
 *                   type: string
 *                   example: "In Progress"
 *                 projectId:
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
 * /delete-task/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Allows the user to delete a task by its ID.
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task successfully deleted
 *       401:
 *         description: Unauthorized access (if no valid token is provided)
 *       500:
 *         description: Internal server error
 */

export default class TaskController {
  private taskUseCase: TaskUseCase;
  constructor(taskUseCase: TaskUseCase) {
    this.taskUseCase = taskUseCase;
  }
  async getAllTasksByProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectId = req.params.id as unknown;
      const result = await this.taskUseCase.getTask(projectId as number);
      return res.status(result?.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id as unknown;
      const task = await this.taskUseCase.getTask(taskId as number);
      return res.status(task?.statusCode).json({ ...task });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = req.body;
      const newTask = await this.taskUseCase.createTask(task);
      return res.status(newTask?.statusCode).json({ ...newTask });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async editTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id as unknown;
      const task = req.body;
      const newTask = await this.taskUseCase.editTask(taskId as number, task);
      return res.status(newTask?.statusCode).json({ ...newTask });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id as unknown;
      const result = await this.taskUseCase.deleteTask(taskId as number);
      return res.status(result?.statusCode).json({ ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
