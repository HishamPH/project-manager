import TaskEntity from "../../entity/taskEntity";

import ITaskRepository from "../../usecase/interfaces/iTaskRepository";
import { Task } from "../database/models";

export default class TaskRepository implements ITaskRepository {
  async findAllTasksByProjectId(
    projectId: number
  ): Promise<TaskEntity[] | null> {
    try {
      const task = await Task.findAll({
        where: {
          projectId: projectId,
        },
      });
      if (task) {
        const plainTasks = task.map((item) => item.toJSON());
        return plainTasks;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findTaskById(taskId: number): Promise<TaskEntity | null> {
    try {
      const task = await Task.findByPk(taskId);
      const data = task?.toJSON();
      if (data) return data;
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createTask(task: TaskEntity): Promise<TaskEntity | null> {
    try {
      const userData = await Task.create(task);
      const data = userData.toJSON();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async editTask(taskId: number, task: TaskEntity): Promise<TaskEntity | null> {
    try {
      const [rows, data] = await Task.update(task, {
        where: { id: taskId },
        returning: true,
      });
      if (rows && data.length) return data[0];
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteTask(taskId: number): Promise<number> {
    try {
      const deletedRows = await Task.destroy({
        where: {
          id: taskId,
        },
      });
      return deletedRows;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}
