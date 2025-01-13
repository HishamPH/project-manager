import { Request, Response, NextFunction } from "express";
import ProjectUseCase from "../usecase/projectUseCase";

export default class ProjectController {
  private projectUseCase: ProjectUseCase;
  constructor(projectUseCase: ProjectUseCase) {
    this.projectUseCase = projectUseCase;
  }
}
