import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class ReservationService extends AuditEntity {
  constructor(
    public reservationServiceId: number,
    public reservationId: number,
    public serviceId: number,
    createdAt: Date,
    createdBy: number,
    updatedAt: Date,
    updatedBy: number,
    deletedAt: Date,
    deletedBy: number,
    isActive: boolean = true,
    isDeleted: boolean = false
  ) {
    super(
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
      deletedAt,
      deletedBy,
      isActive,
      isDeleted
    );
  }
}
