import { ReservationDto } from "@application/Dtos/ReservationModule/ReservationDto";
import { Reservation } from "@domain/entities/ReservationModule/Reservation";
import { ReservationService } from "@domain/entities/ReservationModule/ReservationService";

// Reservation
export class ReservationMapper {
  static toReservationEntity(raw: any): Reservation {
    return new Reservation(
      raw.reservation_id,
      raw.client_id,
      raw.room_id,
      raw.start_date,
      raw.end_date,
      raw.reservation_date,
      raw.status,
      raw.guest_count ?? 1,
      raw.payment_amount,
      raw.created_at,
      raw.created_by ?? raw.client_id,
      raw.updated_at,
      raw.updated_by,
      raw.deleted_at,
      raw.deleted_by,
      raw.is_active,
      raw.is_deleted
    );
  }

  static toReservationModel(entity: Reservation): any {
    return {
      reservation_id: entity.reservationId,
      client_id: entity.clientId,
      room_id: entity.roomId,
      start_date: entity.startDate,
      end_date: entity.endDate,
      reservation_date: entity.reservationDate,
      status: entity.status,
      guest_count: entity.guestCount,
      payment_amount: entity.paymentAmount,
      created_at: entity.createdAt,
      created_by: entity.createdBy ?? entity.clientId,
      updated_at: entity.updatedAt,
      updated_by: entity.updatedBy,
      deleted_at: entity.deletedAt,
      deleted_by: entity.deletedBy,
      is_active: entity.isActive,
      is_deleted: entity.isDeleted,
    };
  }

  static toReservationDto(
    reservation: Reservation,
    clientName: string
  ): ReservationDto {
    return new ReservationDto(
      reservation.reservationId,
      reservation.clientId,
      clientName,
      reservation.roomId,
      reservation.startDate,
      reservation.endDate,
      reservation.reservationDate,
      reservation.status,
      reservation.guestCount,
      reservation.paymentAmount
    );
  }
}

// ReservationService
export class ReservationServiceMapper {
  static toReservationServiceEntity(raw: any): ReservationService {
    return new ReservationService(
      raw.reservation_service_id,
      raw.reservation_id,
      raw.service_id,
      raw.created_at,
      raw.created_by,
      raw.updated_at,
      raw.updated_by,
      raw.deleted_at,
      raw.deleted_by,
      raw.is_active,
      raw.is_deleted
    );
  }

  static toReservationServiceModel(entity: ReservationService): any {
    return {
      reservation_service_id: entity.reservationServiceId,
      reservation_id: entity.reservationId,
      service_id: entity.serviceId,
      created_at: entity.createdAt,
      created_by: entity.createdBy,
      updated_at: entity.updatedAt,
      updated_by: entity.updatedBy,
      deleted_at: entity.deletedAt,
      deleted_by: entity.deletedBy,
      is_active: entity.isActive,
      is_deleted: entity.isDeleted,
    };
  }
}
