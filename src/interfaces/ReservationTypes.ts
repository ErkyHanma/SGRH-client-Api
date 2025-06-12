import { Reservation } from "@entities/Reservation/Reservation";
import { ReservationService } from "@entities/Reservation/ReservationService";
import { IBaseRepository } from "@interfaces/BaseTypes";

// Repositories
export interface IReservationRepository extends IBaseRepository<Reservation> {}
export interface IReservationServiceRepository
  extends IBaseRepository<ReservationService> {}
