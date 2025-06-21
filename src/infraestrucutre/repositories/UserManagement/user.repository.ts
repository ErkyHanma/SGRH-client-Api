import { OperationResult } from "@domain/entities/Base/OperationResult";
import { User } from "@domain/entities/UserManagement/User";
import { IUserRepository } from "@domain/interfaces/UserTypes";
export class UserRepository implements IUserRepository {
  public async getAllAsync(): Promise<OperationResult<User[]>> {
    throw new Error("Method not implemented.");
  }

  public async getByIdAsync(id: number): Promise<OperationResult<User>> {
    throw new Error("Method not implemented.");
  }
  public async addAsync(entity: User): Promise<OperationResult<User>> {
    throw new Error("Method not implemented.");
  }

  public async updateAsync(entity: User): Promise<OperationResult<User>> {
    throw new Error("Method not implemented.");
  }
  public async deleteAsync(entity: User): Promise<OperationResult<User>> {
    throw new Error("Method not implemented.");
  }
}
