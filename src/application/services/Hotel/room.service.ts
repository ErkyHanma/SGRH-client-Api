import { RoomDto } from "@application/Dtos/Hotel/RoomDto";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Room } from "@domain/entities/Hotel/Room";
import { IRoomRepository, IRoomService } from "@domain/interfaces/HotelTypes";
import { RoomMapper } from "@infraestrucutre/mappers/hotel.mapper";

export class RoomService implements IRoomService {
  private readonly roomRepository: IRoomRepository;

  constructor(roomRepository: IRoomRepository) {
    this.roomRepository = roomRepository;
  }

  public async getAllRoomAsync(): Promise<OperationResult<RoomDto[]>> {
    try {
      const rooms = await this.roomRepository.getAllAsync();

      if (!rooms.isSuccess || !rooms.data) {
        return failure(rooms.message);
      }

      const data = rooms.data.map((room) => RoomMapper.toRoomDto(room));

      return success(rooms.message, data);
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }

  public async getRoomByIdAsync(
    roomId: number
  ): Promise<OperationResult<RoomDto>> {
    try {
      const rooms = await this.roomRepository.getByIdAsync(roomId);

      if (!rooms.isSuccess || !rooms.data) {
        return failure(rooms.message);
      }

      const data = RoomMapper.toRoomDto(rooms.data);

      return success(rooms.message, data);
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
}
