import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { ReservationService } from "@domain/entities/ReservationModule/ReservationService";

// Reservation
export class ReservationMapper {
  static toReservationEntity(raw: any): Reservation {
    return new Reservation(
      raw.reservationId,
      raw.clientId,
      raw.roomId,
      raw.startDate,
      raw.endDate,
      raw.reservationDate ?? new Date(),
      raw.status,
      raw.guestCount ?? 1,
      raw.paymentAmount,
      raw.createdAt,
      raw.createdBy,
      raw.updatedAt,
      raw.updatedBy,
      raw.deletedAt,
      raw.deletedBy,
      raw.isActive,
      raw.isDeleted
    );
  }

  static toReservationModel(entity: Reservation): any {
    return {
      reservationId: entity.reservationId,
      clientId: entity.clientId,
      roomId: entity.roomId,
      startDate: entity.startDate,
      endDate: entity.endDate,
      reservationDate: entity.reservationDate,
      status: entity.status,
      guestCount: entity.guestCount,
      paymentAmount: entity.paymentAmount,
      createdAt: entity.createdAt,
      createdBy: entity.createdBy,
      updatedAt: entity.updatedAt,
      updatedBy: entity.updatedBy,
      deletedAt: entity.deletedAt,
      deletedBy: entity.deletedBy,
      isActive: entity.isActive,
      isDeleted: entity.isDeleted,
    };
  }
}

// ReservationService
export class ReservationServiceMapper {
  static toReservationServiceEntity(raw: any): ReservationService {
    return new ReservationService(
      raw.reservationServiceId,
      raw.reservationId,
      raw.serviceId,
      raw.createdAt,
      raw.createdBy,
      raw.updatedAt,
      raw.updatedBy,
      raw.deletedAt,
      raw.deletedBy,
      raw.isActive,
      raw.isDeleted
    );
  }

  static toReservationServiceModel(entity: ReservationService): any {
    return {
      reservationServiceId: entity.reservationServiceId,
      reservationId: entity.reservationId,
      serviceId: entity.serviceId,
      createdAt: entity.createdAt,
      createdBy: entity.createdBy,
      updatedAt: entity.updatedAt,
      updatedBy: entity.updatedBy,
      deletedAt: entity.deletedAt,
      deletedBy: entity.deletedBy,
      isActive: entity.isActive,
      isDeleted: entity.isDeleted,
    };
  }
}
