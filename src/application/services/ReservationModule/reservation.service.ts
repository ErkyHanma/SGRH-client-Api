import { ReservationDto } from "@application/Dtos/ReservationModule/ReservationDto";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { ILogger } from "@domain/interfaces/ILogger";
import {
  IReservationRepository,
  IReservationService,
} from "@domain/interfaces/ReservationModuleTypes";
import { ReservationMapper } from "@infraestrucutre/mappers/reservationModule.mapper";
import {
  ReservationMustBeFuture,
  ValidateRoomAvailability,
} from "@shared/utils";

export class ReservationService implements IReservationService {
  private readonly reservationRepository: IReservationRepository;
  private readonly logger: ILogger;

  constructor(reservationRepository: IReservationRepository, logger: ILogger) {
    this.reservationRepository = reservationRepository;
    this.logger = logger;
  }

  public async getAllReservation(): Promise<OperationResult<ReservationDto[]>> {
    try {
      const reservations = await this.reservationRepository.getAllAsync();

      if (!reservations.isSuccess) {
        this.logger.Error(reservations.message);
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
      this.logger.Error("Error while fetching all reservations", error);
      return failure(`Something went wrong ${error}`);
    }
  }
  public async getReservationByID(
    id: number
  ): Promise<OperationResult<ReservationDto>> {
    try {
      const reservation = await this.reservationRepository.getByIdAsync(id);

      if (!reservation.isSuccess || !reservation.data) {
        this.logger.Error(reservation.message);
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
      this.logger.Error(
        `Error while fetching reservation with ID: ${id}`,
        error
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
  public async getAllReservationByID(
    id: number
  ): Promise<OperationResult<ReservationDto[]>> {
    try {
      const reservations = await this.reservationRepository.getAllByIdAsync(id);

      if (!reservations.isSuccess || !reservations.data) {
        this.logger.Error(reservations.message);
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
      this.logger.Error(
        `Error while fetching all reservation for the user with ID: ${id}`,
        error
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
  public async AddReservation(
    entity: Reservation
  ): Promise<OperationResult<ReservationDto>> {
    try {
      if (!ReservationMustBeFuture(entity.startDate, entity.endDate)) {
        return failure("The reservation cannot be in the past");
      }

      if (!ValidateRoomAvailability(this.reservationRepository, entity)) {
        return failure("The room is not available for the selected days");
      }

      const reservation = await this.reservationRepository.addAsync(entity);

      if (!reservation.isSuccess || !reservation.data) {
        this.logger.Error(reservation.message);
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
      this.logger.Error(`Error while adding new reservation`, error);
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
  public async updateReservation(
    id: number,
    entity: Reservation
  ): Promise<OperationResult<ReservationDto | null>> {
    try {
      if (!ReservationMustBeFuture(entity.startDate, entity.endDate)) {
        return failure("The reservation cannot be in the past");
      }

      if (!ValidateRoomAvailability(this.reservationRepository, entity)) {
        return failure("The room is not available for the selected days");
      }

      const reservation = await this.reservationRepository.updateAsync(
        id,
        entity
      );

      if (!reservation.isSuccess || !reservation.data) {
        this.logger.Error(reservation.message);
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
      this.logger.Error(
        `Error while updating reservation with ID: ${id}`,
        error
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
  public async deleteReservation(
    id: number
  ): Promise<OperationResult<boolean>> {
    try {
      const reservation = await this.reservationRepository.deleteAsync(id);

      if (!reservation.isSuccess) {
        this.logger.Error(reservation.message);
        return failure(reservation.message);
      }

      return success(reservation.message);
    } catch (error) {
      this.logger.Error(
        `Error while deleting reservation with ID ${id}`,
        error
      );
      return failure(`Something went wrong: ${(error as Error).message}`);
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
        this.logger.Error(reservation.message);
        return failure(reservation.message);
      }

      return success(reservation.message);
    } catch (error) {
      this.logger.Error(`Error while Checking Room Availability `, error);
      return failure(`Something went wrong: ${(error as Error).message}`);
    }
  }
}
