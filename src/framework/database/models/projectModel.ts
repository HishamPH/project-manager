import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/dbSetup";
import ProjectEntity from "../../../entity/projectEntity";

class Project extends Model<ProjectEntity> implements ProjectEntity {
  declare id: number;
  public name!: string;
  public description!: string;
  public ownerId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
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
    sequelize,
    tableName: "projects",
    timestamps: true,
  }
);

export default Project;
