import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class Room extends AuditEntity {
  constructor(
    public roomId: number,
    public roomNumber: string,
    public categoryId: number,
    public floorId: number,
    public description?: string,
    public roomImgUrl?: string,
    public status: string = "available",
    createdAt?: Date,
    createdBy?: number,
    updatedAt?: Date,
    updatedBy?: number,
    deletedAt?: Date,
    deletedBy?: number,
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
