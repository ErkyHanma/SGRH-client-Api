import { User } from "@entities/User/User";
import { IBaseRepository } from "@interfaces/BaseTypes";

export interface IUserRepository extends IBaseRepository<User> {}
