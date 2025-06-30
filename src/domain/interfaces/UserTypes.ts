import { UserDto } from "@application/Dtos/UserManagement/UserDto";
import { OperationResult } from "@domain/entities/Base/OperationResult";
import { User } from "@domain/entities/UserManagement/User";
import { IBaseRepository } from "@domain/interfaces/BaseTypes";

export interface IUserRepository extends IBaseRepository<User> {
  getByEmail(email: string): Promise<OperationResult<User | null>>;
}

export interface IUserService {
  getAllUser(): Promise<OperationResult<UserDto[]>>;
  getUserByID(id: number): Promise<OperationResult<UserDto>>;
  getUserByEmail(email: string): Promise<OperationResult<UserDto | null>>;
  AddUser(user: User): Promise<OperationResult<UserDto>>;
  updateUser(id: number, user: User): Promise<OperationResult<UserDto | null>>;
  deleteUser(id: number): Promise<OperationResult<boolean>>;
}

// createUser(user: User): Promise<User>;
//   findUsers(query?: Query): Promise<User[]>;
//   findUsersById(id: string): Promise<User | null>;
//   findUsersByEmail(email: string): Promise<User | null>;
