import { serviceDto } from "@application/Dtos/ServiceModule/ServiceDto";
import { OperationResult } from "@domain/entities/Base/OperationResult";
import { Service } from "@domain/entities/ServiceModule/Service";

// Repositories
export interface IServiceRepository {
  getAllAsync(): Promise<OperationResult<Service[]>>;
  getByIdAsync(id: number): Promise<OperationResult<Service>>;
}

export interface IServiceService {
  getAllServiceAsync(): Promise<OperationResult<serviceDto[]>>;
  getServiceByIdAsync(id: number): Promise<OperationResult<serviceDto>>;
}
