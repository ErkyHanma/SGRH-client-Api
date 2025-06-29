import { serviceDto } from "@application/Dtos/ServiceModule/ServiceDto";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Service } from "@domain/entities/ServiceModule/Service";
import {
  IServiceRepository,
  IServiceService,
} from "@domain/interfaces/ServiceModuleTypes";
import { ServiceMapper } from "@infraestrucutre/mappers/serviceModule.mapper";

export class ServiceService implements IServiceService {
  private readonly serviceRepository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }
  public async getAllServiceAsync(): Promise<OperationResult<serviceDto[]>> {
    try {
      const services = await this.serviceRepository.getAllAsync();

      if (!services.isSuccess) {
        return failure(services.message);
      }

      return success(
        services.message,
        services.data?.map((service) => ServiceMapper.toDto(service))
      );
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
  public async getServiceByIdAsync(
    serviceId: number
  ): Promise<OperationResult<serviceDto>> {
    try {
      const services = await this.serviceRepository.getByIdAsync(serviceId);

      if (!services.isSuccess || !services.data) {
        return failure(services.message);
      }

      return success(services.message, ServiceMapper.toDto(services.data));
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
}
