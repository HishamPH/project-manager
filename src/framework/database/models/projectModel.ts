import { DataTypes } from "sequelize";
import { sequelize } from "../../config/dbSetup";

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "projects",
    timestamps: true,
  }
);

export default Project;

// export default class Project extends Model {
//   declare id: number;
//   public name!: string;
//   public description!: string;
//   public ownerId!: number;

//   // Timestamps
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   // Associations
//   public readonly users?: User[];
//   public readonly tasks?: Task[];
// }

// Project.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     ownerId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     tableName: "Project",
//   }
// );

// // One-to-Many relationship between Project and Task
// Project.hasMany(Task, { foreignKey: "projectId" });
// Task.belongsTo(Project, { foreignKey: "projectId" });
