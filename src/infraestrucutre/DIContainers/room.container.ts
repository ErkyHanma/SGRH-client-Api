import { RoomService } from "@application/services/Hotel/room.service";
import { RoomRepository } from "@infraestrucutre/repositories/Hotel/room.repository";

class RoomContainer {
  private static roomRepository = new RoomRepository();

  static getRoomRepository() {
    return this.roomRepository;
  }

  static getRoomService() {
    return new RoomService(this.getRoomRepository());
  }
}

export {RoomContainer}
