import { failure, success } from "@domain/entities/Base/OperationResult";
import { IReservationService } from "@domain/interfaces/ReservationModuleTypes";

export class ReservationController {
  private readonly reservationService: IReservationService;

  constructor(reservationService: IReservationService) {
    this.reservationService = reservationService;
  }

  public async getAllReservationAsync(req: any, res: any) {
    try {
      const reservation = await this.reservationService.getAllReservation();

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

  public async getReservationByIDAsync(req: any, res: any) {
    try {
      const reservation = await this.reservationService.getReservationByID(
        req.params.id
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

  public async AddReservationAsync(req: any, res: any) {
    try {
      const reservation = await this.reservationService.AddReservation(
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

  public async UpdateReservationAsync(req: any, res: any) {
    try {
      const reservation = await this.reservationService.updateReservation(
        req.params.id,
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

  public async DeleteReservationAsync(req: any, res: any) {
    try {
      const reservation = await this.reservationService.deleteReservation(
        req.params.id
      );

      if (!reservation.isSuccess) {
        return res.status(400).json(reservation.message);
      }

      return res.status(200).json(success(reservation.message));
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

  public async CheckRoomAvailabilityAsync(req: any, res: any) {
    console.log(req.body);
    console.log(req.body.roomId);

    try {
      const reservation = await this.reservationService.CheckRoomAvailability(
        req.body.roomId,
        req.body.startDate,
        req.body.endDate
      );

      if (!reservation.isSuccess) {
        return res.status(400).json(reservation.message);
      }

      return res.status(200).json(success(reservation.message));
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
