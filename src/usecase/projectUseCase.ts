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
}
