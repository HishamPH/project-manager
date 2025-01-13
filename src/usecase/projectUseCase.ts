import ProjectEntity from "../entity/projectEntity";
import IProjectRepository from "./interfaces/iProjectRepository";

interface ResponseType {
  id?: string;
  result?: ProjectEntity | {} | null;
  status: boolean;
  statusCode: number;
  message: string;
}

export default class ProjectUseCase {
  private iProjectRepository: IProjectRepository;
  constructor(iProjectRepository: IProjectRepository) {
    this.iProjectRepository = iProjectRepository;
  }

  async getProject(projectId: number): Promise<ResponseType> {
    try {
      const result = await this.iProjectRepository.findProjectById(projectId);
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

  async createProject(
    project: ProjectEntity,
    ownerId: number
  ): Promise<ResponseType> {
    try {
      const result = await this.iProjectRepository.createProject({
        ...project,
        ownerId,
      });
      return {
        status: true,
        statusCode: 200,
        message: "project created successfully",
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

  async editProject(
    userId: number,
    projectId: number,
    project: ProjectEntity
  ): Promise<ResponseType> {
    try {
      const isOwner = await this.iProjectRepository.isOwner(projectId, userId);
      if (isOwner) {
        const result = await this.iProjectRepository.updateProject(
          projectId,
          project
        );
        return {
          status: true,
          statusCode: 200,
          message: "project edited",
          result,
        };
      }
      return {
        status: false,
        statusCode: 401,
        message: "Only owners can edit projects",
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

  async deleteProject(
    projectId: number,
    userId: number
  ): Promise<ResponseType> {
    try {
      const isOwner = await this.iProjectRepository.isOwner(projectId, userId);
      if (isOwner) {
        const result = await this.iProjectRepository.deleteProject(projectId);
        return {
          status: true,
          statusCode: 200,
          message: "project deleted",
          result,
        };
      }
      return {
        status: false,
        statusCode: 401,
        message: "Only owners can delete projects",
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
