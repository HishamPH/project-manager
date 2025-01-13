import TaskEntity from "../entity/taskEntity";
import ITaskRepository from "./interfaces/iTaskRepository";

export default class TaskUseCase {
  private iTaskRepository: ITaskRepository;
  constructor(iTaskRepository: ITaskRepository) {
    this.iTaskRepository = iTaskRepository;
  }
}
