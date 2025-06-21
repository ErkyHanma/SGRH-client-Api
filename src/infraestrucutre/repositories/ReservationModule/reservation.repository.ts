import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { IReservationRepository } from "@domain/interfaces/ReservationModuleTypes";
import { db } from "@infraestrucutre/database";
import { reservationsTable } from "@infraestrucutre/database/schema/reservationModule.schema";
import { ReservationMapper } from "@infraestrucutre/mappers/reservationModule.mapper";
import { DateNowToString } from "@shared/utils";
import { eq } from "drizzle-orm";

export class ReservationRepository implements IReservationRepository {
  public async getAllAsync(): Promise<OperationResult<Reservation[]>> {
    try {
      const reservations = await db.select().from(reservationsTable);

      const data = reservations.map((reservation) =>
        ReservationMapper.toReservationEntity(reservation)
      );

      return success("Reservations retrieved successfully", data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async getByIdAsync(id: number): Promise<OperationResult<Reservation>> {
    try {
      const reservations = await db
        .select()
        .from(reservationsTable)
        .where(eq(reservationsTable.reservation_id, id));

      if (reservations.length === 0) {
        return failure(`Reservation with id ${id} not found`);
      }

      const data = ReservationMapper.toReservationEntity(reservations[0]);

      return success(`Reservation ${id} retrieved successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async addAsync(
    entity: Reservation
  ): Promise<OperationResult<Reservation>> {
    try {
      const [inserted] = await db
        .insert(reservationsTable)
        .values(ReservationMapper.toReservationModel(entity))
        .returning();

      const data = ReservationMapper.toReservationEntity(inserted);

      return success(`Reservation added successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async updateAsync(
    entity: Reservation
  ): Promise<OperationResult<Reservation>> {
    try {
      const updated = await db
        .update(reservationsTable)
        .set(ReservationMapper.toReservationModel(entity))
        .where(eq(reservationsTable.reservation_id, entity.reservationId));

      return success(`Reservation updated successfully`, entity);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async deleteAsync(
    entity: Reservation
  ): Promise<OperationResult<Reservation>> {
    try {
      await db
        .update(reservationsTable)
        .set({
          is_deleted: true,
          is_active: false,
          deleted_at: DateNowToString(),
        })
        .where(eq(reservationsTable.reservation_id, entity.reservationId));

      return success(`Reservation deleted successfully`, entity);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public checkAvailabilityAsync(): Promise<OperationResult<Reservation>> {
    throw new Error("Method not implemented.");
  }
}
