import TaskEntity from "../../entity/taskEntity";

export default interface ITaskRepository {
  findAllTasksByProjectId(projectId: number): Promise<TaskEntity[] | null>;
  findTaskById(taskId: number): Promise<TaskEntity | null>;
  createTask(task: TaskEntity): Promise<TaskEntity | null>;
  editTask(taskId: number, task: TaskEntity): Promise<TaskEntity | null>;
  deleteTask(taskId: number): Promise<number>;
}
