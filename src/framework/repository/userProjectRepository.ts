import UserProjectEntity from "../../entity/userProjectEntity";
import IUserProjectRepository from "../../usecase/interfaces/iUserProjectRepository";
import { UserProject } from "../database/models";

export default class UserProjectRepository implements IUserProjectRepository {
  async addUserToProject(
    projectId: number,
    userId: number
  ): Promise<UserProjectEntity | null> {
    try {
      const userProject = await UserProject.create({ projectId, userId });
      return userProject;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
