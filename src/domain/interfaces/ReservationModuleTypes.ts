import { OperationResult } from "@domain/entities/Base/OperationResult";
import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { ReservationService } from "@domain/entities/ReservationModule/ReservationService";
import { IBaseRepository } from "@domain/interfaces/BaseTypes";

// Repositories
export interface IReservationRepository extends IBaseRepository<Reservation> {
  checkAvailabilityAsync(): Promise<OperationResult<Reservation>>;
}

export interface IReservationServiceRepository
  extends IBaseRepository<ReservationService> {}
