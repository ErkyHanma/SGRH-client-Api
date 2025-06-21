import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Room } from "@domain/entities/Hotel/Room";
import { IRoomRepository } from "@domain/interfaces/HotelTypes";
import { db } from "@infraestrucutre/database";
import { roomsTable } from "@infraestrucutre/database/schema/hotel.schema";
import { RoomMapper } from "@infraestrucutre/mappers/hotel.mapper";
import { DateNowToString } from "@shared/utils";
import { eq } from "drizzle-orm";

export class RoomRepository implements IRoomRepository {
  public async getAllAsync(): Promise<OperationResult<Room[]>> {
    try {
      const rooms = await db.select().from(roomsTable);

      const data = rooms.map((room) => RoomMapper.toRoomEntity(room));

      return success("Users retrieve successfully", data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async getByIdAsync(id: number): Promise<OperationResult<Room>> {
    try {
      const rooms = await db
        .select()
        .from(roomsTable)
        .where(eq(roomsTable.room_id, id));

      const data = RoomMapper.toRoomEntity(rooms[0]);

      return success(`User ${id} retrieve successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }
  public async addAsync(entity: Room): Promise<OperationResult<Room>> {
    try {
      const [user] = await db
        .insert(roomsTable)
        .values(RoomMapper.toRoomModel(entity))
        .returning();

      const data = RoomMapper.toRoomEntity(user);

      return success(`Room added successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async updateAsync(entity: Room): Promise<OperationResult<Room>> {
    try {
      const [updated] = await db
        .update(roomsTable)
        .set(RoomMapper.toRoomModel(entity))
        .where(eq(roomsTable.room_id, entity.roomId))
        .returning();

      if (!updated) {
        return failure(`Room with id ${entity.roomId} not found`);
      }

      const data = RoomMapper.toRoomEntity(updated);
      return success(`Room updated successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }

  public async deleteAsync(entity: Room): Promise<OperationResult<Room>> {
    try {
      const [deleted] = await db
        .update(roomsTable)
        .set({
          is_deleted: true,
          is_active: false,
          deleted_at: DateNowToString(),
        })
        .where(eq(roomsTable.room_id, entity.roomId))
        .returning();

      if (!deleted) {
        return failure(`Room with id ${entity.roomId} not found`);
      }

      const data = RoomMapper.toRoomEntity(deleted);
      return success(`Room deleted successfully`, data);
    } catch (error) {
      return failure(`Something went wrong: ${error}`);
    }
  }
}
