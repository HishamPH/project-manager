import UserProjectEntity from "../../entity/userProjectEntity";

export default interface IUserProjectRepository {
  addUserToProject(
    projectId: number,
    userId: number
  ): Promise<UserProjectEntity | null>;
}
