import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { ILogger } from "@domain/interfaces/ILogger";
import { IReservationRepository } from "@domain/interfaces/ReservationModuleTypes";
import { db } from "@infrastructure/database";
import { reservationsTable } from "@infrastructure/database/schema/reservationModule.schema";
import { usersTable } from "@infrastructure/database/schema/userManagement.schema";
import { ReservationMapper } from "@infrastructure/mappers/reservationModule.mapper";
import { DateNowToString, DateToString } from "@shared/utils";
import { and, eq, gte, lte } from "drizzle-orm";

// Represents a reservation joined with the client's first and last name (from the users table).
export type ReservationWithName = {
  reservation: Reservation;
  clientName: string;
};

export class ReservationRepository implements IReservationRepository {
  private readonly logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  public async getAllAsync(): Promise<OperationResult<ReservationWithName[]>> {
    this.logger.Info("Fetching all reservations");
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
      this.logger.Error("Error while fetching all reservations", error);
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }

  public async getByIdAsync(
    reservationId: number
  ): Promise<OperationResult<ReservationWithName>> {
    this.logger.Info(`Fetching reservation with ID: ${reservationId}`);
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
            eq(reservationsTable.reservation_id, reservationId),
            eq(reservationsTable.is_active, true),
            eq(reservationsTable.is_deleted, false)
          )
        );

      if (reservations.length === 0) {
        return failure(`Reservation with id ${reservationId} not found`);
      }

      const data = {
        reservation: ReservationMapper.toReservationEntity(
          reservations[0].reservationsTable
        ),
        clientName:
          reservations[0].userName + " " + reservations[0].userLastName,
      };

      return success(
        `Reservation with ID ${reservationId} retrieved successfully`,
        data
      );
    } catch (error) {
      this.logger.Error(
        `Error while fetching reservation with ID: ${reservationId}`,
        error
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }

  public async getAllByIdAsync(
    clientId: number
  ): Promise<OperationResult<ReservationWithName[]>> {
    this.logger.Info(`Fetching all reservation for user with ID: ${clientId}`);
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
            eq(reservationsTable.client_id, clientId),
            eq(reservationsTable.is_active, true),
            eq(reservationsTable.is_deleted, false)
          )
        );

      const clientName =
        reservations[0].userName + " " + reservations[0].userLastName;

      if (reservations.length === 0) {
        return failure(`Reservations from client ${clientName} not found`);
      }

      const data = reservations.map((r) => {
        const reservation = ReservationMapper.toReservationEntity(
          r.reservationsTable
        );
        const clientName = r.userName + " " + r.userLastName;

        return {
          reservation,
          clientName,
        };
      });

      return success(
        `All Reservation from the client ${clientName} retrieved successfully`,
        data
      );
    } catch (error) {
      this.logger.Error(
        `Error while fetching all reservation for the user with ID: ${clientId}`,
        error
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }

  public async addAsync(
    entity: Reservation
  ): Promise<OperationResult<ReservationWithName>> {
    this.logger.Info(`Adding new reservation`);
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
      this.logger.Error(`Error while adding new reservation`, error);
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }

  public async updateAsync(
    id: number,
    entity: Reservation
  ): Promise<OperationResult<ReservationWithName>> {
    this.logger.Info(`Updating reservation with ID: ${id}`);
    try {
      const [exist] = await db
        .select()
        .from(reservationsTable)
        .where(
          and(
            eq(reservationsTable.reservation_id, id),
            eq(reservationsTable.is_active, true),
            eq(reservationsTable.is_deleted, false)
          )
        );

      if (!exist) {
        return failure(`Reservation with id ${id} not found`);
      }

      const [updated] = await db
        .update(reservationsTable)
        .set(ReservationMapper.toReservationModel(entity))
        .where(eq(reservationsTable.reservation_id, id))
        .returning();

      if (!updated) {
        return failure("Failed to update reservation");
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
      this.logger.Error(
        `Error while updating reservation with ID: ${id}`,
        error
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }

  public async deleteAsync(
    id: number
  ): Promise<OperationResult<ReservationWithName>> {
    this.logger.Info(`Deleting reservation with ID: ${id}`);
    try {
      const [exist] = await db
        .select()
        .from(reservationsTable)
        .where(
          and(
            eq(reservationsTable.reservation_id, id),
            eq(reservationsTable.is_active, true),
            eq(reservationsTable.is_deleted, false)
          )
        );

      if (!exist) {
        return failure(`Reservation with id ${id} not found`);
      }

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
      this.logger.Error(
        `Error while deleting reservation with ID ${id}`,
        error
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }

  public async checkRoomAvailabilityAsync(
    roomId: number,
    startDate: Date,
    endDate: Date
  ): Promise<OperationResult<boolean>> {
    this.logger.Info(
      `Checking Room Availability for the Room ${roomId}. Start Date: ${startDate} End Date: ${endDate}`
    );
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

      return success("The room is available for reservation.", true);
    } catch (error) {
      this.logger.Error(`Error while Checking Room Availability `, error);
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
}
