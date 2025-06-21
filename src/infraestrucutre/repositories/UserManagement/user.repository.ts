import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { User } from "@domain/entities/UserManagement/User";
import { IUserRepository } from "@domain/interfaces/UserTypes";
import { db } from "@infraestrucutre/database";
import { usersTable } from "@infraestrucutre/database/schema/userManagement.schema";
import { UserMapper } from "@infraestrucutre/mappers/user.mapper";
import { DateNowToString } from "@shared/utils";
import { eq } from "drizzle-orm";

export class UserRepository implements IUserRepository {
  public async getAllAsync(): Promise<OperationResult<User[]>> {
    try {
      const users = await db.select().from(usersTable);

      const data = users.map((user) => UserMapper.toUserEntity(user));

      return success("Users retrieve successfully", data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async getByIdAsync(id: number): Promise<OperationResult<User>> {
    try {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.userId, id));

      const data = UserMapper.toUserEntity(user[0]);

      return success(`User ${id} retrieve successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }
  public async addAsync(entity: User): Promise<OperationResult<User>> {
    try {
      const [created] = await db
        .insert(usersTable)
        .values(UserMapper.toUserModel(entity))
        .returning();

      const data = UserMapper.toUserEntity(created);

      return success(`User added successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async updateAsync(entity: User): Promise<OperationResult<User>> {
    try {
      const [updated] = await db
        .update(usersTable)
        .set(UserMapper.toUserModel(entity))
        .where(eq(usersTable.userId, entity.userId))
        .returning();

      if (!updated) {
        return failure(`User with id ${entity.userId} not found`);
      }

      const data = UserMapper.toUserEntity(updated);
      return success(`User updated successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async deleteAsync(entity: User): Promise<OperationResult<User>> {
    try {
      const [deleted] = await db
        .update(usersTable)
        .set({
          isDeleted: true,
          isActive: false,
          deletedAt: DateNowToString(),
        })
        .where(eq(usersTable.userId, entity.userId))
        .returning();

      if (!deleted) {
        return failure(`User with id ${entity.userId} not found`);
      }

      const data = UserMapper.toUserEntity(deleted);
      return success(`User deleted successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }
}
