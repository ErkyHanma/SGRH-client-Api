import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Service } from "@domain/entities/ServiceModule/Service";
import { ILogger } from "@domain/interfaces/ILogger";
import { IServiceRepository } from "@domain/interfaces/ServiceModuleTypes";
import { db } from "@infrastructure/database";
import { servicesTable } from "@infrastructure/database/schema/servicesModule.schema";
import { ServiceMapper } from "@infrastructure/mappers/serviceModule.mapper";
import { and, eq } from "drizzle-orm";

export class ServiceRepository implements IServiceRepository {
  private readonly logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  public async getAllAsync(): Promise<OperationResult<Service[]>> {
    this.logger.Info("Fetching all services");
    try {
      const services = await db
        .select()
        .from(servicesTable)
        .where(
          and(
            eq(servicesTable.is_active, true),
            eq(servicesTable.is_deleted, false)
          )
        );

      const data = services.map((service) =>
        ServiceMapper.toServiceEntity(service)
      );

      return success("Services retrieved successfully", data);
    } catch (error) {
      this.logger.Error("Error while fetching all users", error);
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }

  public async getByIdAsync(
    serviceId: number
  ): Promise<OperationResult<Service>> {
    this.logger.Info(`Fetching service by ID: ${serviceId}`);

    try {
      const services = await db
        .select()
        .from(servicesTable)
        .where(
          and(
            eq(servicesTable.service_id, serviceId),
            eq(servicesTable.is_active, true),
            eq(servicesTable.is_deleted, false)
          )
        );

      if (services.length === 0) {
        return failure(`Service with id ${serviceId} not found`);
      }

      const data = ServiceMapper.toServiceEntity(services[0]);

      return success(`Service ${serviceId} retrieved successfully`, data);
    } catch (error) {
      this.logger.Error(
        `Error while fetching services with ID ${serviceId}`,
        error
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
}
