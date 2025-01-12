import express from "express";
const userRouter = express.Router();

import UserRepository from "../repository/userRepository";
import UserUseCase from "../../usecase/userUseCase";
import UserController from "../../controller/userController";

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

userRouter.get("/", userController.createUser);

export default userRouter;
