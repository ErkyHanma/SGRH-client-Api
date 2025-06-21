import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { ReservationService } from "@domain/entities/ReservationModule/ReservationService";
import { IReservationServiceRepository } from "@domain/interfaces/ReservationModuleTypes";
import { db } from "@infraestrucutre/database";
import { reservationServiceTable } from "@infraestrucutre/database/schema/reservationModule.schema";
import { ReservationServiceMapper } from "@infraestrucutre/mappers/reservationModule.mapper";
import { eq } from "drizzle-orm";

export class ReservationServiceRepository
  implements IReservationServiceRepository
{
  public async AddAsync(
    entity: ReservationService
  ): Promise<OperationResult<ReservationService>> {
    try {
      const [reservationServiceInserted] = await db
        .insert(reservationServiceTable)
        .values(ReservationServiceMapper.toReservationServiceModel(entity))
        .returning();

      const data = ReservationServiceMapper.toReservationServiceEntity(
        reservationServiceInserted
      );

      return success("Reservations retrieved successfully", data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }
  public async DeleteAsync(
    entity: ReservationService
  ): Promise<OperationResult<ReservationService>> {
    try {
      await db
        .delete(reservationServiceTable)
        .where(
          eq(
            reservationServiceTable.reservation_service_id,
            entity.reservationServiceId
          )
        );

      return success("Service removed from reservation successfully");
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }
}
