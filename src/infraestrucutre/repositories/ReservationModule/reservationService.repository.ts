import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { ReservationService } from "@domain/entities/ReservationModule/ReservationService";
import { ILogger } from "@domain/interfaces/ILogger";
import { IReservationServiceRepository } from "@domain/interfaces/ReservationModuleTypes";
import { db } from "@infraestrucutre/database";
import { reservationServiceTable } from "@infraestrucutre/database/schema/reservationModule.schema";
import { servicesTable } from "@infraestrucutre/database/schema/servicesModule.schema";
import { ReservationServiceMapper } from "@infraestrucutre/mappers/reservationModule.mapper";
import { and, eq } from "drizzle-orm";

export class ReservationServiceRepository
  implements IReservationServiceRepository
{
  private readonly logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  public async AddAsync(
    entity: ReservationService
  ): Promise<OperationResult<boolean>> {
    this.logger.Info(
      `Adding Service to reservation with ID ${entity.reservationId}`
    );
    try {
      const [service] = await db
        .select()
        .from(servicesTable)
        .where(
          and(
            eq(servicesTable.service_id, entity.serviceId),
            eq(servicesTable.is_active, true),
            eq(servicesTable.is_deleted, false)
          )
        );

      if (!service) {
        return failure("This service does not exits");
      }

      const [data] = await db
        .select()
        .from(reservationServiceTable)
        .where(
          and(
            eq(reservationServiceTable.service_id, entity.serviceId),
            eq(reservationServiceTable.reservation_id, entity.reservationId)
          )
        );

      if (data) {
        return failure("This service is already added in the reservation");
      }

      await db
        .insert(reservationServiceTable)
        .values(ReservationServiceMapper.toReservationServiceModel(entity));

      return success(`Service ${service.name} added correctly`);
    } catch (error) {
      this.logger.Error(
        `Error while adding service to reservation with ID: ${entity.reservationId}`
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
  public async DeleteAsync(
    entity: ReservationService
  ): Promise<OperationResult<boolean>> {
    this.logger.Info(
      `Deleting Service from reservation with ID ${entity.reservationId}`
    );
    try {
      const [service] = await db
        .select()
        .from(reservationServiceTable)
        .where(
          and(
            eq(reservationServiceTable.service_id, entity.serviceId),
            eq(reservationServiceTable.reservation_id, entity.reservationId)
          )
        );

      if (!service) {
        return failure("This service is not added in the reservation");
      }

      await db
        .delete(reservationServiceTable)
        .where(
          and(
            eq(reservationServiceTable.service_id, entity.serviceId),
            eq(reservationServiceTable.reservation_id, entity.reservationId)
          )
        );

      return success("Service removed from reservation successfully");
    } catch (error) {
      this.logger.Error(
        `Error while adding service to reservation with ID: ${entity.reservationId}`
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
}
