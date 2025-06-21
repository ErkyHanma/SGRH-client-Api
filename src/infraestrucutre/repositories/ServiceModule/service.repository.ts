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
import { DateNowToString } from "@shared/utils";
import { eq } from "drizzle-orm";

export class ServiceRepository implements IServiceRepository {
  public async getAllAsync(): Promise<OperationResult<Service[]>> {
    try {
      const services = await db.select().from(servicesTable);

      const data = services.map((service) =>
        ServiceMapper.toServiceEntity(service)
      );

      return success("Services retrieved successfully", data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async getByIdAsync(id: number): Promise<OperationResult<Service>> {
    try {
      const services = await db
        .select()
        .from(servicesTable)
        .where(eq(servicesTable.service_id, id)); // usa serviceId según tu esquema

      if (services.length === 0) {
        return failure(`Service with id ${id} not found`);
      }

      const data = ServiceMapper.toServiceEntity(services[0]);

      return success(`Service ${id} retrieved successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async addAsync(entity: Service): Promise<OperationResult<Service>> {
    try {
      const [service] = await db
        .insert(servicesTable)
        .values(ServiceMapper.toServiceModel(entity))
        .returning();

      const data = ServiceMapper.toServiceEntity(service);

      return success(`Service added successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async updateAsync(entity: Service): Promise<OperationResult<Service>> {
    try {
      await db
        .update(servicesTable)
        .set(ServiceMapper.toServiceModel(entity))
        .where(eq(servicesTable.service_id, entity.serviceId));

      return success(`Service updated successfully`, entity);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async deleteAsync(entity: Service): Promise<OperationResult<Service>> {
    try {
      const deletedCount = await db
        .update(servicesTable)
        .set({
          is_deleted: true,
          is_active: false,
          deleted_at: DateNowToString(),
        })
        .where(eq(servicesTable.service_id, entity.serviceId));

      if (deletedCount.length < 0) {
        return failure(`Service with id ${entity.serviceId} not found`);
      }

      return success(`Service deleted successfully`, entity);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }
}
