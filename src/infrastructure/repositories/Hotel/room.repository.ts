import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Room } from "@domain/entities/Hotel/Room";
import { IRoomRepository } from "@domain/interfaces/HotelTypes";
import { ILogger } from "@domain/interfaces/ILogger";
import { db } from "@infrastructure/database";
import {
  floorsTable,
  rateTable,
  room_categoryTable,
  roomsTable,
  seasonTable,
} from "@infrastructure/database/schema/hotel.schema";
import { RoomMapper } from "@infrastructure/mappers/hotel.mapper";
import { getCurrentSeasonId } from "@shared/utils";
import { and, eq, gte, lte } from "drizzle-orm";

export type RoomDetails = {
  Room: Room;
  floorNumber: number;
  roomCategoryName: string;
  roomCategoryDescription: string | null;
  roomCategoryMaxCapacity: number | null;
  roomAmenities: string | null;
  roomImageUrl: string | null;
  nightPrice: string;
};

export class RoomRepository implements IRoomRepository {
  private readonly logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  public async getAllAsync(): Promise<OperationResult<RoomDetails[]>> {
    this.logger.Info(`Fetching all rooms`);
    try {
      const currentSeasonId = await getCurrentSeasonId(db, seasonTable);

      const rooms = await db
        .select({
          Room: roomsTable,
          floorNumber: floorsTable.floor_number,
          roomCategoryName: room_categoryTable.name,
          roomCategoryDescription: room_categoryTable.description,
          roomCategoryMaxCapacity: room_categoryTable.max_capacity,
          roomAmenities: room_categoryTable.amenities,
          roomImageUrl: roomsTable.room_img_url,
          nightPrice: rateTable.night_price,
        })
        .from(roomsTable)
        .innerJoin(floorsTable, eq(floorsTable.floor_id, roomsTable.floor_id))
        .innerJoin(rateTable, eq(rateTable.category_id, roomsTable.category_id))
        .innerJoin(
          room_categoryTable,
          eq(room_categoryTable.category_id, rateTable.category_id)
        )
        .where(
          and(
            eq(roomsTable.is_active, true),
            eq(roomsTable.is_deleted, false),
            eq(rateTable.season_id, currentSeasonId ?? 2)
          )
        );

      if (!rooms) {
        return failure("Rooms cannot be retrieve");
      }

      const data = rooms.map((r) => {
        const Room = RoomMapper.toRoomEntity(r.Room);
        const floorNumber = r.floorNumber;
        const roomCategoryName = r.roomCategoryName;
        const roomCategoryDescription = r.roomCategoryDescription;
        const roomCategoryMaxCapacity = r.roomCategoryMaxCapacity;
        const roomAmenities = r.roomAmenities;
        const roomImageUrl = r.roomImageUrl;
        const nightPrice = r.nightPrice;

        return {
          Room,
          floorNumber,
          roomCategoryName,
          roomCategoryDescription,
          roomCategoryMaxCapacity,
          roomAmenities,
          roomImageUrl,
          nightPrice,
        };
      });

      return success("Rooms retrieve successfully", data);
    } catch (error) {
      this.logger.Error(`Error while fetching all rooms`, error);
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }

  public async getByIdAsync(
    roomId: number
  ): Promise<OperationResult<RoomDetails>> {
    this.logger.Info(`Fetching room with ID: ${roomId}`);
    try {
      const currentSeasonId = await getCurrentSeasonId(db, seasonTable);

      const [room] = await db
        .select({
          Room: roomsTable,
          floorNumber: floorsTable.floor_number,
          roomCategoryName: room_categoryTable.name,
          roomCategoryDescription: room_categoryTable.description,
          roomCategoryMaxCapacity: room_categoryTable.max_capacity,
          roomAmenities: room_categoryTable.amenities,
          roomImageUrl: roomsTable.room_img_url,
          nightPrice: rateTable.night_price,
        })
        .from(roomsTable)
        .innerJoin(floorsTable, eq(floorsTable.floor_id, roomsTable.floor_id))
        .innerJoin(rateTable, eq(rateTable.category_id, roomsTable.category_id))
        .innerJoin(
          room_categoryTable,
          eq(room_categoryTable.category_id, rateTable.category_id)
        )
        .where(
          and(
            eq(roomsTable.room_id, roomId),
            eq(roomsTable.is_active, true),
            eq(roomsTable.is_deleted, false),
            eq(rateTable.season_id, currentSeasonId ?? 2)
          )
        );

      if (!room) {
        return failure(`Room with the ID ${roomId} not found`);
      }

      const data = {
        Room: RoomMapper.toRoomEntity(room.Room),
        floorNumber: room.floorNumber,
        roomCategoryName: room.roomCategoryName,
        roomCategoryDescription: room.roomCategoryDescription,
        roomCategoryMaxCapacity: room.roomCategoryMaxCapacity,
        roomAmenities: room.roomAmenities,
        roomImageUrl: room.roomImageUrl,
        nightPrice: room.nightPrice,
      };

      return success(`Room with ID ${roomId} retrieve successfully`, data);
    } catch (error) {
      this.logger.Error(`Error while fetching room with ID: ${roomId}`, error);
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
}
