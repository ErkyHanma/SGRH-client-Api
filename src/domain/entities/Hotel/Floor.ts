import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class Floor extends AuditEntity {
  constructor(
    public floorId: number,
    public floorNumber: number,
    public description: string,
    public status: string = "active",
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
