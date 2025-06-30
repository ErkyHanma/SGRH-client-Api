import { ReservationDto } from "@application/Dtos/ReservationModule/ReservationDto";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { ReservationService } from "@domain/entities/ReservationModule/ReservationService";
import {
  IReservationRepository,
  IReservationService,
  IReservationServiceRepository,
  IReservationServiceService,
} from "@domain/interfaces/ReservationModuleTypes";
import { ReservationMapper } from "@infraestrucutre/mappers/reservationModule.mapper";
import { ReservationWithName } from "@infraestrucutre/repositories/ReservationModule/reservation.repository";

export class ReservationServiceService implements IReservationServiceService {
  private readonly reservationServiceRepository: IReservationServiceRepository;

  constructor(reservationServiceRepository: IReservationServiceRepository) {
    this.reservationServiceRepository = reservationServiceRepository;
  }

  public async AddReservationServiceAsync(
    reservationService: ReservationService
  ): Promise<OperationResult<ReservationService>> {
    try {
      const reservation = await this.reservationServiceRepository.AddAsync(
        reservationService
      );

      if (!reservation.isSuccess) {
        return failure(reservation.message);
      }

      return success(reservation.message);
    } catch (error) {
      return failure(`Something went wrong ${error}`);
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
        return failure(reservation.message);
      }

      return success(reservation.message);
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
}
