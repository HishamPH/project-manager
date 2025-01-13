import ProjectEntity from "../../entity/projectEntity";

export default interface IProjectRepository {
  findProjectById(projectId: number): Promise<ProjectEntity | null>;

  isOwner(projectId: number, userId: number): Promise<boolean>;
  createProject(project: ProjectEntity): Promise<ProjectEntity | null>;
  updateProject(
    projectId: number,
    project: ProjectEntity
  ): Promise<ProjectEntity | null>;
  deleteProject(projectId: number): Promise<number>;
}
