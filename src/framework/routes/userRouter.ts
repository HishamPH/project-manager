import express from "express";
const userRouter = express.Router();

import userAuth from "../middlewares/userAuth";
import JwtToken from "../services/jwtToken";
import UserProjectRepository from "../repository/userProjectRepository";

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
const userProjectRepository = new UserProjectRepository();

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

//============= Authentication routes ===================

userRouter.post("/signup", (req, res, next) => {
  authController.signupUser(req, res, next);
});
userRouter.post("/login", (req, res, next) => {
  authController.loginUser(req, res, next);
});
userRouter.post("/logout", userAuth, (req, res, next) => {
  authController.logoutUser(req, res, next);
});

//=================== Authorized user routes ====================

userRouter.get("/details", userAuth, (req, res, next) => {
  userController.getUserDetails(req, res, next);
});

userRouter.put("/edit", userAuth, (req, res, next) => {
  userController.updateUser(req, res, next);
});

userRouter.delete("/delete", userAuth, (req, res, next) => {
  userController.deleteUser(req, res, next);
});

//==================== Project Routes ====================

userRouter.post("/project/add-user", userAuth, (req, res, next) => {
  projectController.addProjectUser(req, res, next);
});

userRouter.get("/project/:id", userAuth, (req, res, next) => {
  projectController.getProject(req, res, next);
});

userRouter.post("/create-project", userAuth, (req, res, next) => {
  projectController.createProject(req, res, next);
});

userRouter.put("/edit-project/:id", userAuth, (req, res, next) => {
  projectController.editProject(req, res, next);
});

userRouter.delete("/delete-project/:id", userAuth, (req, res, next) => {
  projectController.deleteProject(req, res, next);
});

//==================== Task Routes ========================

userRouter.get("/project/:id/tasks", userAuth, (req, res, next) => {
  taskController.getAllTasksByProject(req, res, next);
});

userRouter.get("/get-task/:id", userAuth, (req, res, next) => {
  taskController.getTask(req, res, next);
});

userRouter.post("/create-task", userAuth, (req, res, next) => {
  taskController.createTask(req, res, next);
});

userRouter.put("/edit-task/:id", userAuth, (req, res, next) => {
  taskController.editTask(req, res, next);
});

userRouter.delete("/delete-task/:id", userAuth, (req, res, next) => {
  taskController.deleteTask(req, res, next);
});

export default userRouter;
