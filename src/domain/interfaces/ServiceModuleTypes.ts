import { Service } from "@domain/entities/ServiceModule/Service";
import { ServiceCategory } from "@domain/entities/ServiceModule/ServiceCategory";
import { IBaseRepository } from "@domain/interfaces/BaseTypes";

// Repositories
export interface IServiceRepository extends IBaseRepository<Service> {}
export interface IServiceCategoryRepository
  extends IBaseRepository<ServiceCategory> {}
