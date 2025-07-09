import { RoomDto } from "@application/Dtos/Hotel/RoomDto";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Room } from "@domain/entities/Hotel/Room";
import { IRoomRepository, IRoomService } from "@domain/interfaces/HotelTypes";
import { ILogger } from "@domain/interfaces/ILogger";
import { RoomMapper } from "@infraestrucutre/mappers/hotel.mapper";

export class RoomService implements IRoomService {
  private readonly roomRepository: IRoomRepository;
  private readonly Logger: ILogger;

  constructor(roomRepository: IRoomRepository, logger: ILogger) {
    this.roomRepository = roomRepository;
    this.Logger = this.Logger;
  }

  public async getAllRoomAsync(): Promise<OperationResult<RoomDto[]>> {
    try {
      const rooms = await this.roomRepository.getAllAsync();

      if (!rooms.isSuccess || !rooms.data) {
        this.Logger.Error(rooms.message);
        return failure(rooms.message);
      }

      const data = rooms.data.map((room) => RoomMapper.toRoomDto(room));

      return success(rooms.message, data);
    } catch (error) {
      this.Logger.Error(`Error while fetching all rooms`, error);
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }

  public async getRoomByIdAsync(
    roomId: number
  ): Promise<OperationResult<RoomDto>> {
    try {
      const rooms = await this.roomRepository.getByIdAsync(roomId);

      if (!rooms.isSuccess || !rooms.data) {
        this.Logger.Error(rooms.message);
        return failure(rooms.message);
      }

      const data = RoomMapper.toRoomDto(rooms.data);

      return success(rooms.message, data);
    } catch (error) {
      this.Logger.Error(`Error while fetching room with ID: ${roomId}`, error);
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
}
