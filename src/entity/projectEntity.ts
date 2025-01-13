export default interface ProjectEntity {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
