import { Room } from "@domain/entities/Hotel/Room";
import { RoomDetails } from "@infrastructure/repositories/Hotel/room.repository";

export class RoomBuilder {
  private _entity = new Room(
    1, // roomId
    "123", // roomNumber
    1, // categoryId
    1, // floorId
    "A Standard room", // description
    "", // roomImgUrl
    "available", // status
    new Date("2025-01-01T10:00:00Z"), // createdAt
    1001, // createdBy
    new Date("2025-06-01T12:00:00Z"), // updatedAt
    1002, // updatedBy
    null, // deletedAt
    null, // deletedBy
    true, // isActive
    false // isDeleted
  );

  public withRoomId(roomId: number): RoomBuilder {
    this._entity.roomId = roomId;
    return this;
  }

  public build(): Room {
    return this._entity;
  }

  public buildRoomDetails(): RoomDetails {
    return {
      Room: this._entity,
      floorNumber: 1,
      roomCategoryName: "Standard Single",
      roomCategoryDescription: "Basic single room with essential amenities",
      roomCategoryMaxCapacity: 1,
      roomAmenities: "Free WiFi, TV, Air conditioning, Private bathroom",
      roomImageUrl: "https://example.com/storage/rooms/101.jpg",
      nightPrice: "120.00",
    };
  }
}
