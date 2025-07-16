import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class Service extends AuditEntity {
  constructor(
    public serviceId: number,
    public name: string,
    public description: string,
    public price: number,
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
