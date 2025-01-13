import express from "express";
const userRouter = express.Router();

import userAuth from "../middlewares/userAuth";
import JwtToken from "../services/jwtToken";

import UserRepository from "../repository/userRepository";
import UserUseCase from "../../usecase/userUseCase";
import UserController from "../../controller/userController";

import AuthUseCase from "../../usecase/authUseCase";
import AuthController from "../../controller/authController";

import ProjectRepository from "../repository/projectRepository";
import ProjectUseCase from "../../usecase/projectUseCase";
import ProjectController from "../../controller/projectController";

import TaskRepository from "../repository/taskRepository";
import TaskUseCase from "../../usecase/taskUseCase";
import TaskController from "../../controller/taskController";

const jwtToken = new JwtToken();

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

const authUseCase = new AuthUseCase(userRepository, jwtToken);
const authController = new AuthController(authUseCase);

const projectRepository = new ProjectRepository();
const projectUseCase = new ProjectUseCase(projectRepository);
const projectController = new ProjectController(projectUseCase);

const taskRepository = new TaskRepository();
const taskUseCase = new TaskUseCase(taskRepository);
const taskController = new TaskController(taskUseCase);

userRouter.get("/", (req, res, next) => {
  authController.signupUser(req, res, next);
});

export default userRouter;
