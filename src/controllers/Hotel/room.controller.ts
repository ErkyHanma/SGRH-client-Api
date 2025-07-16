import { failure, success } from "@domain/entities/Base/OperationResult";
import { RoomContainer } from "@infrastructure/DIContainers/room.container";

export class RoomController {
  private readonly roomService = RoomContainer.getRoomService();

  public async getAllRoomAsync(req: any, res: any) {
    try {
      const services = await this.roomService.getAllRoomAsync();

      if (!services.isSuccess) {
        return res.status(400).json(services.message);
      }

      return res.status(200).json(success(services.message, services.data));
    } catch (error) {
      return res
        .status(500)
        .json(
          failure(
            `Error while retrieving users. Error: ${(error as Error).message}`
          )
        );
    }
  }

  public async getRoomByID(req: any, res: any) {
    try {
      const services = await this.roomService.getRoomByIdAsync(req.params.id);

      if (!services.isSuccess) {
        return res.status(400).json(services.message);
      }

      return res.status(200).json(success(services.message, services.data));
    } catch (error) {
      return res
        .status(500)
        .json(
          failure(
            `Error while retrieving users. Error: ${(error as Error).message}`
          )
        );
    }
  }
}
