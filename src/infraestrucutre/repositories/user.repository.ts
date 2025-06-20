import {
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { User } from "@domain/entities/UserManagement/User";
import { IUserRepository } from "@domain/interfaces/UserTypes";

export class UserRepository implements IUserRepository {
  async getAllAsync(): Promise<OperationResult<User>> {
    return success("Good");
  }
  getByIdAsync(id: number): Promise<OperationResult<User>> {
    throw new Error("Method not implemented.");
  }
  addAsync(entity: User): Promise<OperationResult<User>> {
    throw new Error("Method not implemented.");
  }
  updateAsync(entity: User): Promise<OperationResult<User>> {
    throw new Error("Method not implemented.");
  }
  deleteAsync(entity: User): Promise<OperationResult<User>> {
    throw new Error("Method not implemented.");
  }
}
