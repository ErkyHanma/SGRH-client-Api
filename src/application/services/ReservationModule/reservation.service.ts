import { ReservationDto } from "@application/Dtos/ReservationModule/ReservationDto";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import {
  IReservationRepository,
  IReservationService,
} from "@domain/interfaces/ReservationModuleTypes";
import { ReservationMapper } from "@infraestrucutre/mappers/reservationModule.mapper";
import { ReservationWithName } from "@infraestrucutre/repositories/ReservationModule/reservation.repository";

export class ReservationService implements IReservationService {
  private readonly reservationRepository: IReservationRepository;

  constructor(reservationRepository: IReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  public async getAllReservation(): Promise<OperationResult<ReservationDto[]>> {
    try {
      const reservations = await this.reservationRepository.getAllAsync();

      if (!reservations.isSuccess) {
        return failure(reservations.message);
      }

      return success(
        reservations.message,
        reservations.data?.map((reservation) =>
          ReservationMapper.toReservationDto(
            reservation.reservation,
            reservation.clientName
          )
        )
      );
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
  public async getReservationByID(
    id: number
  ): Promise<OperationResult<ReservationDto>> {
    try {
      const reservation = await this.reservationRepository.getByIdAsync(id);

      if (!reservation.isSuccess || !reservation.data) {
        return failure(reservation.message);
      }

      return success(
        reservation.message,
        ReservationMapper.toReservationDto(
          reservation.data.reservation,
          reservation.data.clientName
        )
      );
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
  public async AddReservation(
    entity: Reservation
  ): Promise<OperationResult<ReservationDto>> {
    try {
      const reservation = await this.reservationRepository.addAsync(entity);

      if (!reservation.isSuccess || !reservation.data) {
        return failure(reservation.message);
      }

      return success(
        reservation.message,
        ReservationMapper.toReservationDto(
          reservation.data.reservation,
          reservation.data.clientName
        )
      );
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
  public async updateReservation(
    id: number,
    entity: Reservation
  ): Promise<OperationResult<ReservationDto | null>> {
    try {
      const reservation = await this.reservationRepository.updateAsync(
        id,
        entity
      );

      if (!reservation.isSuccess || !reservation.data) {
        return failure(reservation.message);
      }

      return success(
        reservation.message,
        ReservationMapper.toReservationDto(
          reservation.data.reservation,
          reservation.data.clientName
        )
      );
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
  public async deleteReservation(
    id: number
  ): Promise<OperationResult<boolean>> {
    try {
      const reservation = await this.reservationRepository.deleteAsync(id);

      if (!reservation.isSuccess) {
        return failure(reservation.message);
      }

      return success(reservation.message);
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
  public async CheckRoomAvailability(
    roomId: number,
    startDate: Date,
    endDate: Date
  ): Promise<OperationResult<boolean>> {
    try {
      const reservation =
        await this.reservationRepository.checkRoomAvailabilityAsync(
          roomId,
          startDate,
          endDate
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
