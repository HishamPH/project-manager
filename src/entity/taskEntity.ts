export default interface TaskEntity {
  id: number;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Done";
  projectId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
