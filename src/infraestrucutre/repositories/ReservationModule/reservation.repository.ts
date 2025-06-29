import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { IReservationRepository } from "@domain/interfaces/ReservationModuleTypes";
import { client, db } from "@infraestrucutre/database";
import { reservationsTable } from "@infraestrucutre/database/schema/reservationModule.schema";
import { usersTable } from "@infraestrucutre/database/schema/userManagement.schema";
import { ReservationMapper } from "@infraestrucutre/mappers/reservationModule.mapper";
import { DateNowToString, DateToString } from "@shared/utils";
import { and, eq, gte, lte } from "drizzle-orm";

// Represents a reservation joined with the client's first and last name (from the users table).
export type ReservationWithName = {
  reservation: Reservation;
  clientName: string;
};

export class ReservationRepository implements IReservationRepository {
  getAllByIdAsync(id: number): Promise<OperationResult<ReservationWithName[]>> {
    throw new Error("Method not implemented.");
  }
  public async getAllAsync(): Promise<OperationResult<ReservationWithName[]>> {
    try {
      const reservations = await db
        .select({
          userName: usersTable.firstName,
          userLastName: usersTable.lastName,
          reservationsTable,
        })
        .from(reservationsTable)
        .innerJoin(
          usersTable,
          eq(reservationsTable.client_id, usersTable.userId)
        )
        .where(
          and(
            eq(reservationsTable.is_active, true),
            eq(reservationsTable.is_deleted, false)
          )
        );

      const data = reservations.map((r) => {
        const userName = r.userName;
        const userLastName = r.userLastName;
        const reservationEntity = ReservationMapper.toReservationEntity(
          r.reservationsTable
        );

        return {
          reservation: reservationEntity,
          clientName: userName + " " + userLastName,
        };
      });

      return success("Reservations retrieved successfully", data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async getByIdAsync(
    id: number
  ): Promise<OperationResult<ReservationWithName>> {
    try {
      const reservations = await db
        .select({
          userName: usersTable.firstName,
          userLastName: usersTable.lastName,
          reservationsTable,
        })
        .from(reservationsTable)
        .innerJoin(
          usersTable,
          eq(reservationsTable.client_id, usersTable.userId)
        )
        .where(
          and(
            eq(reservationsTable.reservation_id, id),
            eq(reservationsTable.is_active, true),
            eq(reservationsTable.is_deleted, false)
          )
        );

      if (reservations.length === 0) {
        return failure(`Reservation with id ${id} not found`);
      }

      const data = {
        reservation: ReservationMapper.toReservationEntity(
          reservations[0].reservationsTable
        ),
        clientName:
          reservations[0].userName + " " + reservations[0].userLastName,
      };

      return success(`Reservation with ID ${id} retrieved successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async addAsync(
    entity: Reservation
  ): Promise<OperationResult<ReservationWithName>> {
    try {
      const [inserted] = await db
        .insert(reservationsTable)
        .values(ReservationMapper.toReservationModel(entity))
        .returning();

      if (!inserted) {
        return failure("Failed to insert reservation");
      }

      const [reservation] = await db
        .select({
          userName: usersTable.firstName,
          userLastName: usersTable.lastName,
          reservationsTable,
        })
        .from(reservationsTable)
        .innerJoin(
          usersTable,
          eq(reservationsTable.client_id, usersTable.userId)
        )
        .where(
          and(
            eq(reservationsTable.reservation_id, inserted.reservation_id),
            eq(reservationsTable.is_active, true),
            eq(reservationsTable.is_deleted, false)
          )
        );

      const data = {
        reservation: ReservationMapper.toReservationEntity(
          reservation.reservationsTable
        ),
        clientName: reservation.userName + " " + reservation.userLastName,
      };

      return success(`Reservation added successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async updateAsync(
    id: number,
    entity: Reservation
  ): Promise<OperationResult<ReservationWithName>> {
    try {
      const [updated] = await db
        .update(reservationsTable)
        .set(ReservationMapper.toReservationModel(entity))
        .where(eq(reservationsTable.reservation_id, id))
        .returning();

      if (!updated) {
        return failure("Failed to insert reservation");
      }

      const [reservation] = await db
        .select({
          userName: usersTable.firstName,
          userLastName: usersTable.lastName,
          reservationsTable,
        })
        .from(reservationsTable)
        .innerJoin(
          usersTable,
          eq(reservationsTable.client_id, usersTable.userId)
        )
        .where(
          and(
            eq(reservationsTable.reservation_id, updated.reservation_id),
            eq(reservationsTable.is_active, true),
            eq(reservationsTable.is_deleted, false)
          )
        );

      const data = {
        reservation: ReservationMapper.toReservationEntity(
          reservation.reservationsTable
        ),
        clientName: reservation.userName + " " + reservation.userLastName,
      };

      return success(`Reservation updated successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async deleteAsync(
    id: number
  ): Promise<OperationResult<ReservationWithName>> {
    try {
      await db
        .update(reservationsTable)
        .set({
          is_deleted: true,
          is_active: false,
          deleted_at: DateNowToString(),
        })
        .where(eq(reservationsTable.reservation_id, id));

      return success(`Reservation deleted successfully`);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async checkRoomAvailabilityAsync(
    roomId: number,
    startDate: Date,
    endDate: Date
  ): Promise<OperationResult<boolean>> {
    try {
      const overlappingReservations = await db
        .select()
        .from(reservationsTable)
        .where(
          and(
            eq(reservationsTable.room_id, roomId),
            eq(reservationsTable.is_active, true),
            eq(reservationsTable.is_deleted, false),
            lte(reservationsTable.start_date, DateToString(startDate)),
            gte(reservationsTable.end_date, DateToString(endDate))
          )
        );

      if (overlappingReservations.length > 0) {
        return failure("The room is already reserved for the selected dates.");
      }

      return success("The room is available for reservation.");
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }
}
