import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class Reservation extends AuditEntity {
  reservationId: number;
  clientId: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
  reservationDate: Date = new Date();
  status?: string;
  guestCount: number;
  paymentAmount: number;
}
