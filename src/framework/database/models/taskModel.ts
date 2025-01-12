import { DataTypes } from "sequelize";
import { sequelize } from "../../config/dbSetup";

const Task = sequelize.define(
  "Task",
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
    tableName: "tasks", // Explicit table name
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default Task;

// export default class Task extends Model {
//   declare id: number;
//   public title!: string;
//   public description!: string;
//   public status!: "To Do" | "In Progress" | "Done";
//   public projectId!: number;

//   // Timestamps
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// Task.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.ENUM("To Do", "In Progress", "Done"),
//       allowNull: false,
//     },
//     projectId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     tableName: "Task",
//   }
// );
