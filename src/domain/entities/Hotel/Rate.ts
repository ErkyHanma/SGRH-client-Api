import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class Rate extends AuditEntity {
  constructor(
    public rateId: number,
    public categoryId: number,
    public seasonId: number,
    public nightPrice: number,
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
