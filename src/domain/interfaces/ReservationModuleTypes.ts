import { ReservationDto } from "@application/Dtos/ReservationModule/ReservationDto";
import { OperationResult } from "@domain/entities/Base/OperationResult";
import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { ReservationService } from "@domain/entities/ReservationModule/ReservationService";
import { ReservationWithName } from "@infrastructure/repositories/ReservationModule/reservation.repository";

// Reservation
export interface IReservationRepository {
  getAllAsync(): Promise<OperationResult<ReservationWithName[]>>;
  getByIdAsync(id: number): Promise<OperationResult<ReservationWithName>>;
  addAsync(entity: Reservation): Promise<OperationResult<ReservationWithName>>;
  updateAsync(
    id: number,
    entity: Reservation
  ): Promise<OperationResult<ReservationWithName>>;
  deleteAsync(id: number): Promise<OperationResult<ReservationWithName>>;
  getAllByIdAsync(id: number): Promise<OperationResult<ReservationWithName[]>>;
  checkRoomAvailabilityAsync(
    roomId: number,
    startDate: Date,
    endDate: Date
  ): Promise<OperationResult<boolean>>;
}

export interface IReservationService {
  getAllReservation(): Promise<OperationResult<ReservationDto[]>>;
  getReservationByID(id: number): Promise<OperationResult<ReservationDto>>;
  getAllReservationByID(id: number): Promise<OperationResult<ReservationDto[]>>;
  AddReservation(user: Reservation): Promise<OperationResult<ReservationDto>>;
  updateReservation(
    id: number,
    user: Reservation
  ): Promise<OperationResult<ReservationDto | null>>;
  deleteReservation(id: number): Promise<OperationResult<boolean>>;
  CheckRoomAvailability(
    roomId: number,
    startDate: Date,
    endDate: Date
  ): Promise<OperationResult<boolean>>;
}

// Reservation Service
export interface IReservationServiceRepository {
  AddAsync(entity: ReservationService): Promise<OperationResult<boolean>>;
  DeleteAsync(entity: ReservationService): Promise<OperationResult<boolean>>;
}

export interface IReservationServiceService {
  AddReservationServiceAsync(
    reservationService: ReservationService
  ): Promise<OperationResult<boolean>>;

  DeleteReservationServiceAsync(
    reservationService: ReservationService
  ): Promise<OperationResult<boolean>>;
}
