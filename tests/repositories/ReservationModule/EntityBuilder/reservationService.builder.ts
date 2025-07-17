import { ReservationService } from "@domain/entities/ReservationModule/ReservationService";

export class ReservationServiceBuilder {
  private _entity = new ReservationService(
    1, // ReservationService
    2, // reservationId
    2, // serviceId
    new Date("2025-01-01T10:00:00Z"), // createdAt
    1001, // createdBy
    new Date("2025-06-01T12:00:00Z"), // updatedAt
    1002, // updatedBy
    null, // deletedAt
    null, // deletedBy
    true, // isActive
    false // isDeleted
  );

  public withReservationId(reservationId: number): ReservationServiceBuilder {
    this._entity.reservationId = reservationId;
    return this;
  }

  public withServiceId(serviceId: number): ReservationServiceBuilder {
    this._entity.serviceId = serviceId;
    return this;
  }

  public build(): ReservationService {
    return this._entity;
  }
}
