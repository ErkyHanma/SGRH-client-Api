import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { ReservationWithName } from "@infrastructure/repositories/ReservationModule/reservation.repository";

export class ReservationBuilder {
  private _entity = new Reservation(
    1, // reservationId
    1, // clientId
    2, // roomId
    new Date("2026-12-01"), // startDate
    new Date("2026-12-04"), // endDate
    new Date("2025-06-25"), // reservationDate
    "Pending", // status
    2, // guestCount
    125, // paymentAmount
    new Date("2025-01-01T10:00:00Z"), // createdAt
    1001, // createdBy
    new Date("2025-06-01T12:00:00Z"), // updatedAt
    1002, // updatedBy
    null, // deletedAt
    null, // deletedBy
    true, // isActive
    false // isDeleted
  );

  public withReservationId(reservationId: number): ReservationBuilder {
    this._entity.reservationId = reservationId;
    return this;
  }

  public withClientId(clientId: number): ReservationBuilder {
    this._entity.clientId = clientId;
    return this;
  }

  public withStartDate(startDate: Date): ReservationBuilder {
    this._entity.startDate = startDate;
    return this;
  }

  public withEndDate(endDate: Date): ReservationBuilder {
    this._entity.endDate = endDate;
    return this;
  }

  public build(): Reservation {
    return this._entity;
  }

  // Reservation with name (not the Reservation Entity)
  public buildWithName(): ReservationWithName {
    return { reservation: this._entity, clientName: "Joe Doe" };
  }
}
