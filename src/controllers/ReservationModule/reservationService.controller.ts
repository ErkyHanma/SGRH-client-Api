import { failure, success } from "@domain/entities/Base/OperationResult";
import { IReservationServiceService } from "@domain/interfaces/ReservationModuleTypes";

export class ReservationServiceController {
  private readonly reservationServiceService: IReservationServiceService;

  constructor(reservationServiceService: IReservationServiceService) {
    this.reservationServiceService = reservationServiceService;
  }

  public async AddReservationServiceAsync(req: any, res: any) {
    try {
      const reservation =
        await this.reservationServiceService.AddReservationServiceAsync(
          req.body
        );

      if (!reservation.isSuccess) {
        return res.status(400).json(reservation.message);
      }

      return res
        .status(200)
        .json(success(reservation.message, reservation.data));
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

  public async DeleteReservationServiceAsync(req: any, res: any) {
    try {
      const reservation =
        await this.reservationServiceService.DeleteReservationServiceAsync(
          req.body
        );

      if (!reservation.isSuccess) {
        return res.status(400).json(reservation.message);
      }

      return res
        .status(200)
        .json(success(reservation.message));
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
