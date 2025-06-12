import { Service } from "@entities/Services/Service";
import { ServiceCategory } from "@entities/Services/ServiceCategory";
import { IBaseRepository } from "@interfaces/BaseTypes";

// Repositories
export interface IServiceRepository extends IBaseRepository<Service> {}
export interface IServiceCategoryRepository
  extends IBaseRepository<ServiceCategory> {}
