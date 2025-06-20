import { User } from "@domain/entities/UserManagement/User";
import { IBaseRepository } from "@domain/interfaces/BaseTypes";

export interface IUserRepository extends IBaseRepository<User> {}
