import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Service } from "@domain/entities/ServiceModule/Service";
import { IServiceRepository } from "@domain/interfaces/ServiceModuleTypes";
import { db } from "@infraestrucutre/database";
import { servicesTable } from "@infraestrucutre/database/schema/servicesModule.schema";
import { ServiceMapper } from "@infraestrucutre/mappers/serviceModule.mapper";
import { and, eq } from "drizzle-orm";

export class ServiceRepository implements IServiceRepository {
  public async getAllAsync(): Promise<OperationResult<Service[]>> {
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
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async getByIdAsync(
    serviceId: number
  ): Promise<OperationResult<Service>> {
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
      return failure(`Something went wrong: ${error}`);
    }
  }
}
