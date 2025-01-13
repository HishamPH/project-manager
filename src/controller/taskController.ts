import { Request, Response, NextFunction } from "express";
import TaskUseCase from "../usecase/taskUseCase";

export default class TaskController {
  private taskUseCase: TaskUseCase;
  constructor(taskUseCase: TaskUseCase) {
    this.taskUseCase = taskUseCase;
  }
}
