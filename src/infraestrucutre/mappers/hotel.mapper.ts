import { RoomDto } from "@application/Dtos/Hotel/RoomDto";
import { Room } from "@domain/entities/Hotel/Room";
import { RoomDetails } from "@infraestrucutre/repositories/Hotel/room.repository";

//Room:
export class RoomMapper {
  static toRoomEntity(raw: any): Room {
    return new Room(
      raw.room_id,
      raw.room_number,
      raw.category_id,
      raw.floor_id,
      raw.description,
      raw.room_img_url,
      raw.status,
      raw.created_at,
      raw.created_by,
      raw.updated_at,
      raw.updated_by,
      raw.deleted_at,
      raw.deleted_by,
      raw.is_active,
      raw.is_deleted
    );
  }

  static toRoomModel(entity: Room): any {
    return {
      room_id: entity.roomId,
      room_number: entity.roomNumber,
      category_id: entity.categoryId,
      floor_id: entity.floorId,
      description: entity.description,
      room_img_url: entity.roomImgUrl,
      status: entity.status,
      created_at: entity.createdAt,
      created_by: entity.createdBy,
      updated_at: entity.updatedAt,
      updated_by: entity.updatedBy,
      deleted_at: entity.deletedAt,
      deleted_by: entity.deletedBy,
      is_active: entity.isActive,
      is_deleted: entity.isDeleted,
    };
  }

  static toRoomDto(room: RoomDetails): RoomDto {
    return new RoomDto(
      room.Room.roomId,
      room.floorNumber,
      room.roomCategoryName,
      room.roomCategoryDescription,
      room.roomCategoryMaxCapacity,
      room.roomAmenities,
      room.roomImageUrl,
      room.nightPrice
    );
  }
}

//
