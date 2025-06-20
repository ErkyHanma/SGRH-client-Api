import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class ReservationService extends AuditEntity {
  reservationServiceId: number;
  reservationId: number;
  serviceCategoryId: number;
  totalPrice: number;
}
