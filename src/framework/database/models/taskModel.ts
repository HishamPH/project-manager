import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/dbSetup";
import TaskEntity from "../../../entity/taskEntity";

class Task extends Model<TaskEntity> implements TaskEntity {
  declare id: number;
  public title!: string;
  public description!: string;
  public status!: "To Do" | "In Progress" | "Done";
  public projectId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("To Do", "In Progress", "Done"),
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
  }
);

export default Task;
