import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/dbSetup";
import UserEntity from "../../../entity/userEntity";

class User extends Model<UserEntity> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;

  // Timestamps (if enabled)
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;

// class User extends Model {
//   declare id: number;
//   public name!: string;
//   public email!: string;
//   public password!: string;

//   // Timestamps
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   // Associations
//   public readonly projects?: Project[];
// }

// User.init(
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
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     tableName: "User",
//     timestamps: true,
//   }
// );

// export default User;
