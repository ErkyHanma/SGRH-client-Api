import { serviceDto } from "@application/Dtos/ServiceModule/ServiceDto";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Service } from "@domain/entities/ServiceModule/Service";
import { ILogger } from "@domain/interfaces/ILogger";
import {
  IServiceRepository,
  IServiceService,
} from "@domain/interfaces/ServiceModuleTypes";
import { ServiceMapper } from "@infraestrucutre/mappers/serviceModule.mapper";

export class ServiceService implements IServiceService {
  private readonly serviceRepository: IServiceRepository;
  private readonly logger: ILogger;

  constructor(serviceRepository: IServiceRepository, logger: ILogger) {
    this.serviceRepository = serviceRepository;
    this.logger = logger;
  }
  public async getAllServiceAsync(): Promise<OperationResult<serviceDto[]>> {
    try {
      const services = await this.serviceRepository.getAllAsync();

      if (!services.isSuccess) {
        this.logger.Error(services.message);
        return failure(services.message);
      }

      return success(
        services.message,
        services.data?.map((service) => ServiceMapper.toDto(service))
      );
    } catch (error) {
      this.logger.Error("Error while fetching all users", error);
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
  public async getServiceByIdAsync(
    serviceId: number
  ): Promise<OperationResult<serviceDto>> {
    try {
      const services = await this.serviceRepository.getByIdAsync(serviceId);

      if (!services.isSuccess || !services.data) {
        this.logger.Error(services.message);
        return failure(services.message);
      }

      return success(services.message, ServiceMapper.toDto(services.data));
    } catch (error) {
      this.logger.Error(
        `Error while fetching services with ID ${serviceId}`,
        error
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
}
