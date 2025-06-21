import { Service } from "@domain/entities/ServiceModule/Service";
import { IBaseRepository } from "@domain/interfaces/BaseTypes";

// Repositories
export interface IServiceRepository extends IBaseRepository<Service> {}
