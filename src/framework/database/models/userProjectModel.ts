import { DataTypes } from "sequelize";
import Project from "./projectModel";
import User from "./userModel";
import { sequelize } from "../../config/dbSetup";

const UserProject = sequelize.define(
  "UserProject",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "projects",
        key: "id",
      },
    },
  },
  {
    tableName: "users_projects",
    timestamps: true,
  }
);

// export const setupAssociations = () => {
//   User.belongsToMany(Project, {
//     through: UserProject,
//     as: "projects",
//     foreignKey: "userId",
//   });

//   Project.belongsToMany(User, {
//     through: UserProject,
//     as: "users",
//     foreignKey: "projectId",
//   });
// };

export const setupAssociations = () => {
  // Many-to-Many between User and Project
  User.belongsToMany(Project, { through: UserProject, foreignKey: "userId" });
  Project.belongsToMany(User, {
    through: UserProject,
    foreignKey: "projectId",
  });

  // One-to-Many for Project Owner
  Project.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
  User.hasMany(Project, { as: "ownedProjects", foreignKey: "ownerId" });
};

export default UserProject;

// User.belongsToMany(Project, {
//   through: "UserProject",
//   foreignKey: "userId",
//   otherKey: "projectId",
// });

// // Many-to-Many relationship between User and Project (through UserProject join table)
// Project.belongsToMany(User, {
//   through: "UserProject",
//   foreignKey: "projectId",
//   otherKey: "userId",
// });
