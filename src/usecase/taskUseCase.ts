import TaskEntity from "../entity/taskEntity";
import ITaskRepository from "./interfaces/iTaskRepository";

interface ResponseType {
  id?: string;
  result?: TaskEntity | {} | null;
  status: boolean;
  statusCode: number;
  message: string;
}

export default class TaskUseCase {
  private iTaskRepository: ITaskRepository;
  constructor(iTaskRepository: ITaskRepository) {
    this.iTaskRepository = iTaskRepository;
  }

  async getAllTasksByProject(projectId: number): Promise<ResponseType> {
    try {
      const result = await this.iTaskRepository.findAllTasksByProjectId(
        projectId
      );
      return {
        status: true,
        statusCode: 200,
        message: "user found",
        result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async getTask(taskId: number): Promise<ResponseType> {
    try {
      const result = await this.iTaskRepository.findTaskById(taskId);
      return {
        status: true,
        statusCode: 200,
        message: "user found",
        result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async createTask(task: TaskEntity): Promise<ResponseType> {
    try {
      const result = await this.iTaskRepository.createTask(task);
      return {
        status: true,
        statusCode: 200,
        message: "user found",
        result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async editTask(taskId: number, task: TaskEntity): Promise<ResponseType> {
    try {
      const result = await this.iTaskRepository.editTask(taskId, task);
      return {
        status: true,
        statusCode: 200,
        message: "task edited",
        result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async deleteTask(taskId: number): Promise<ResponseType> {
    try {
      const result = await this.iTaskRepository.deleteTask(taskId);
      return {
        status: true,
        statusCode: 200,
        message: "task deleted",
        result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }
}
