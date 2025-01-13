import UserEntity from "../../entity/userEntity";
import IUserRepsoitory from "../../usecase/interfaces/iUserRepository";
import { Project, User, UserProject, Task } from "../database/models";
import bcrypt from "bcryptjs";
import { sequelize } from "../config/dbSetup";
import { Op } from "sequelize";

export default class UserRepository implements IUserRepsoitory {
  async findUserById(userId: number): Promise<{} | null> {
    try {
      const user = await User.findByPk(userId);
      if (user) return user;
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async findUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) return user;
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async createUser(user: UserEntity): Promise<UserEntity | null> {
    try {
      let { name, email, password } = user;
      password = await bcrypt.hash(password, 10);

      const userData = await User.create({ name, email, password });
      const data = userData.toJSON();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async loginUser(hash: string, password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateUser(
    userId: number,
    user: UserEntity
  ): Promise<UserEntity | null> {
    try {
      const [rows, data] = await User.update(user, {
        where: { id: userId },
        returning: true,
      });
      if (rows && data.length) return data[0];
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteUser(userId: number): Promise<number> {
    const t = await sequelize.transaction();

    try {
      await UserProject.destroy({
        where: {
          userId: userId,
        },
        transaction: t,
      });
      const projectIds = await Project.findAll({
        attributes: ["id"],
        where: {
          ownerId: userId,
        },
        transaction: t,
      }).then((projects) => projects.map((project) => project.id));
      if (projectIds.length > 0) {
        await Task.destroy({
          where: {
            projectId: {
              [Op.in]: projectIds,
            },
          },
          transaction: t,
        });
      }

      await Project.destroy({
        where: {
          ownerId: userId,
        },
        transaction: t,
      });

      const deletedRows = await User.destroy({
        where: {
          id: userId,
        },
        transaction: t,
      });
      await t.commit();
      return deletedRows;
    } catch (error) {
      await t.rollback();
      console.log(error);
      return -1;
    }
  }
}
