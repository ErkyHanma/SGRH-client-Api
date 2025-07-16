import { RoomService } from "@application/services/Hotel/room.service";
import { Logger } from "@infrastructure/logger/logger";
import { RoomRepository } from "@infrastructure/repositories/Hotel/room.repository";

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
