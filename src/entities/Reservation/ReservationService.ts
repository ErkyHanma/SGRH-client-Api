import { AuditEntity } from "@entities/Base/AuditEntity";

export class ReservationService extends AuditEntity {
  reservationServiceId: number;
  reservationId: number;
  serviceCategoryId: number;
  totalPrice: number;
}
