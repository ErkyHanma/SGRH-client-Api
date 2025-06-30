import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { ReservationService } from "@domain/entities/ReservationModule/ReservationService";
import { IReservationServiceRepository } from "@domain/interfaces/ReservationModuleTypes";
import { db } from "@infraestrucutre/database";
import { reservationServiceTable } from "@infraestrucutre/database/schema/reservationModule.schema";
import { servicesTable } from "@infraestrucutre/database/schema/servicesModule.schema";
import { ReservationServiceMapper } from "@infraestrucutre/mappers/reservationModule.mapper";
import { and, eq } from "drizzle-orm";

export class ReservationServiceRepository
  implements IReservationServiceRepository
{
  public async AddAsync(
    entity: ReservationService
  ): Promise<OperationResult<boolean>> {
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
      return failure(`Something went wrong: ${error}`);
    }
  }
  public async DeleteAsync(
    entity: ReservationService
  ): Promise<OperationResult<boolean>> {
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
      return failure(`Something went wrong: ${error}`);
    }
  }
}
