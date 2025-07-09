import { ReservationDto } from "@application/Dtos/ReservationModule/ReservationDto";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { ReservationService } from "@domain/entities/ReservationModule/ReservationService";
import { ILogger } from "@domain/interfaces/ILogger";
import {
  IReservationServiceRepository,
  IReservationServiceService,
} from "@domain/interfaces/ReservationModuleTypes";

export class ReservationServiceService implements IReservationServiceService {
  private readonly reservationServiceRepository: IReservationServiceRepository;
  private readonly logger: ILogger;

  constructor(
    reservationServiceRepository: IReservationServiceRepository,
    logger: ILogger
  ) {
    this.reservationServiceRepository = reservationServiceRepository;
    this.logger = logger;
  }

  public async AddReservationServiceAsync(
    reservationService: ReservationService
  ): Promise<OperationResult<ReservationService>> {
    try {
      const reservation = await this.reservationServiceRepository.AddAsync(
        reservationService
      );

      if (!reservation.isSuccess) {
        this.logger.Error(reservation.message);
        return failure(reservation.message);
      }

      return success(reservation.message);
    } catch (error) {
      this.logger.Error(
        `Error while adding service to reservation with ID: ${reservationService.reservationId}`
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }

  public async DeleteReservationServiceAsync(
    reservationService: ReservationService
  ): Promise<OperationResult<ReservationService>> {
    try {
      const reservation = await this.reservationServiceRepository.DeleteAsync(
        reservationService
      );

      if (!reservation.isSuccess) {
        this.logger.Error(reservation.message);
        return failure(reservation.message);
      }

      return success(reservation.message);
    } catch (error) {
      this.logger.Error(
        `Error while adding service to reservation with ID: ${reservationService.reservationId}`
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
}
