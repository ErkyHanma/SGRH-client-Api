import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { IReservationRepository } from "@domain/interfaces/ReservationModuleTypes";
import { and, gte, lte } from "drizzle-orm";

export const DateNowToString = function () {
  return new Date().toISOString().split("T")[0].toString();
};

export const DateToString = function (date: Date | string): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

export const DateNow = (): Date => new Date();

// Check that reservation Dates are in the future
export function ReservationMustBeFuture(
  start_date: Date | string,
  end_date: Date | string
): boolean {
  const currentDate = DateNow();
  return new Date(start_date) > currentDate && new Date(end_date) > currentDate;
}

export async function ValidateRoomAvailability(
  reservationRepository: IReservationRepository,
  entity: Reservation
): Promise<boolean> {
  const isAvailable = await reservationRepository.checkRoomAvailabilityAsync(
    entity.roomId,
    entity.startDate,
    entity.endDate
  );

  return isAvailable.isSuccess;
}

// Get the season ID based on the current date
export async function getCurrentSeasonId(
  db: any,
  seasonTable: any
): Promise<number | null> {
  const currentDate = DateNowToString();

  const season = await db
    .select({
      seasonId: seasonTable.season_id,
    })
    .from(seasonTable)
    .where(
      and(
        lte(seasonTable.start_date, currentDate),
        gte(seasonTable.end_date, currentDate)
      )
    );

  if (!season || season.length === 0) {
    return null;
  }

  return season[0].seasonId;
}
