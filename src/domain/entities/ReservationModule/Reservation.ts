import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class Reservation extends AuditEntity {
  constructor(
    public reservationId: number,
    public clientId: number,
    public roomId: number,
    public startDate: Date,
    public endDate: Date,
    public reservationDate: Date = new Date(),
    public status: string,
    public guestCount: number = 1,
    public paymentAmount: number,
    createdAt: Date,
    createdBy: number | null,
    updatedAt: Date | null,
    updatedBy: number | null,
    deletedAt: Date | null,
    deletedBy: number | null,
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
