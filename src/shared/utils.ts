import { failure } from "@domain/entities/Base/OperationResult";
import { and, gte, lte } from "drizzle-orm";

export const DateNowToString = function () {
  return new Date().toISOString().split("T")[0].toString();
};

export const DateToString = function (date: Date | string): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

export const DateNow = (): Date => new Date();


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
