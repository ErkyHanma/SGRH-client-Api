import { UserDto } from "@application/Dtos/UserManagement/UserDto";
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
import { and, eq, is } from "drizzle-orm";

export class UserRepository implements IUserRepository {
  public async getAllAsync(): Promise<OperationResult<User[]>> {
    try {
      const users = await db
        .select()
        .from(usersTable)
        .where(
          and(eq(usersTable.isActive, true), eq(usersTable.isDeleted, false))
        );

      console.log(users[0]);

      const data = users.map((user) => UserMapper.toUserEntity(user));

      return success("Users retrieve successfully", data);
    } catch (error) {
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
  public async getByIdAsync(id: number): Promise<OperationResult<User>> {
    try {
      const user = await db
        .select()
        .from(usersTable)
        .where(
          and(
            eq(usersTable.userId, id),
            eq(usersTable.isActive, true),
            eq(usersTable.isDeleted, false)
          )
        );

      if (!user) {
        return failure(`User with id ${id} not found`);
      }

      const data = UserMapper.toUserEntity(user[0]);

      return success(`User ${id} retrieve successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async getByEmail(email: string): Promise<OperationResult<User>> {
    try {
      const user = await db
        .select()
        .from(usersTable)
        .where(
          and(
            eq(usersTable.email, email),
            eq(usersTable.isActive, true),
            eq(usersTable.isDeleted, false)
          )
        );

      if (!user) {
        return failure(`User not found with the given email ${email}`);
      }

      const data = UserMapper.toUserEntity(user[0]);

      return success("User retrieve successfully", data);
    } catch (error) {
      return failure(`Something went wrong ${error}`);
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

  public async updateAsync(
    id: number,
    entity: User
  ): Promise<OperationResult<User>> {
    try {
      const [exist] = await db
        .select()
        .from(usersTable)
        .where(
          and(
            eq(usersTable.userId, id),
            eq(usersTable.isActive, true),
            eq(usersTable.isDeleted, false)
          )
        );

      if (!exist) {
        return failure(`User with id ${id} not found`);
      }

      // Update the user
      const [updated] = await db
        .update(usersTable)
        .set({
          ...UserMapper.toUserModel(entity),
          updatedAt: DateNowToString(),
        })
        .where(eq(usersTable.userId, id))
        .returning();

      if (!updated) {
        return failure(`User with id ${id} could not be updated`);
      }

      const data = UserMapper.toUserEntity(updated);
      return success("User updated successfully", data);
    } catch (error) {
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }

  public async deleteAsync(id: number): Promise<OperationResult<User>> {
    try {
      const [exist] = await db
        .select()
        .from(usersTable)
        .where(
          and(
            eq(usersTable.userId, id),
            eq(usersTable.isActive, true),
            eq(usersTable.isDeleted, false)
          )
        );

      if (!exist) {
        return failure(`User with id ${id} not found`);
      }

      const [deleted] = await db
        .update(usersTable)
        .set({
          isDeleted: true,
          isActive: false,
          deletedAt: DateNowToString(),
        })
        .where(eq(usersTable.userId, id))
        .returning();

      if (!deleted) {
        return failure(`User with id ${id} not found`);
      }

      const data = UserMapper.toUserEntity(deleted);
      return success(`User deleted successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }
}
