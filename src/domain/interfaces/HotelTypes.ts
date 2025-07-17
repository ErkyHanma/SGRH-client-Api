import { RoomDto } from "@application/Dtos/Hotel/RoomDto";
import { OperationResult } from "@domain/entities/Base/OperationResult";
import { RoomDetails } from "@infrastructure/repositories/Hotel/room.repository";

// Repositories
export interface IRoomRepository {
  getAllAsync(): Promise<OperationResult<RoomDetails[]>>;
  getByIdAsync(id: number): Promise<OperationResult<RoomDetails>>;
}

export interface IRoomService {
  getAllRoomAsync(): Promise<OperationResult<RoomDto[]>>;
  getRoomByIdAsync(id: number): Promise<OperationResult<RoomDto>>;
}
