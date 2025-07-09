import { RoomService } from "@application/services/Hotel/room.service";
import { Logger } from "@infraestrucutre/logger/logger";
import { RoomRepository } from "@infraestrucutre/repositories/Hotel/room.repository";

class RoomContainer {
  private static logger = new Logger();
  private static roomRepository = new RoomRepository(RoomContainer.logger);

  static getRoomRepository() {
    return this.roomRepository;
  }

  static getRoomService() {
    return new RoomService(this.getRoomRepository(), this.logger);
  }
}

export { RoomContainer };
