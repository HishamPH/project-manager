import ProjectEntity from "../../entity/projectEntity";
import IProjectRepository from "../../usecase/interfaces/iProjectRepository";
import { Project, Task } from "../database/models";

export default class ProjectRepository implements IProjectRepository {
  async findProjectById(projectId: number): Promise<ProjectEntity | null> {
    try {
      const project = await Project.findByPk(projectId);
      if (project) return project;
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async isOwner(projectId: number, userId: number): Promise<boolean> {
    try {
      const isOwner = await Project.findOne({
        where: { id: projectId, ownerId: userId },
      });
      let result: boolean = false;
      if (isOwner) result = true;
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async createProject(project: ProjectEntity): Promise<ProjectEntity | null> {
    try {
      const newProject = await Project.create(project);
      if (newProject) return newProject.toJSON();
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateProject(
    projectId: number,
    project: ProjectEntity
  ): Promise<ProjectEntity | null> {
    try {
      const [rows, updatedProjects] = await Project.update(project, {
        where: { id: projectId },
        returning: true,
      });
      if (rows && updatedProjects.length) return updatedProjects[0];
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async deleteProject(projectId: number): Promise<number> {
    try {
      const deletedRows = await Project.destroy({
        where: { id: projectId },
      });
      const result = await Task.destroy({
        where: {
          projectId: projectId,
        },
      });
      return deletedRows;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}
