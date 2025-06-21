import { OperationResult } from "@domain/entities/Base/OperationResult";
import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { ReservationService } from "@domain/entities/ReservationModule/ReservationService";
import { IBaseRepository } from "@domain/interfaces/BaseTypes";

// Reservation
export interface IReservationRepository extends IBaseRepository<Reservation> {
  checkAvailabilityAsync(): Promise<OperationResult<Reservation>>;
}

// Reservation Service
export interface IReservationServiceRepository {
  AddAsync(
    entity: ReservationService
  ): Promise<OperationResult<ReservationService>>;
}

export interface IReservationServiceRepository {
  DeleteAsync(
    entity: ReservationService
  ): Promise<OperationResult<ReservationService>>;
}
