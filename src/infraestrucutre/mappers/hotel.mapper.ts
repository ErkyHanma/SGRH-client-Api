import { Room } from "@domain/entities/Hotel/Room";


//Room:
export class RoomMapper {
  static toRoomEntity(raw: any): Room {
    return new Room(
      raw.roomId,
      raw.roomNumber,
      raw.categoryId,
      raw.floorId,
      raw.description,
      raw.roomImgUrl,
      raw.status,
      raw.createdAt,
      raw.createdBy,
      raw.updatedAt,
      raw.updatedBy,
      raw.deletedAt,
      raw.deletedBy,
      raw.isActive,
      raw.isDeleted
    );
  }

  static toRoomModel(entity: Room): any {
    return {
      roomId: entity.roomId,
      roomNumber: entity.roomNumber,
      categoryId: entity.categoryId,
      floorId: entity.floorId,
      description: entity.description,
      roomImgUrl: entity.roomImgUrl,
      status: entity.status,
      createdAt: entity.createdAt,
      createdBy: entity.createdBy,
      updatedAt: entity.updatedAt,
      updatedBy: entity.updatedBy,
      deletedAt: entity.deletedAt,
      deletedBy: entity.deletedBy,
      isActive: entity.isActive,
      isDeleted: entity.isDeleted,
    };
  }
}


// 