import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class RoomCategory extends AuditEntity {
  constructor(
    public categoryId: number,
    public name: string,
    public description: string,
    public maxCapacity: number,
    public amenities: string,
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
