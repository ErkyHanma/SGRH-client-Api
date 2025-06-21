export abstract class AuditEntity {
  constructor(
    public readonly createdAt: Date = new Date(),
    public readonly createdBy?: number,
    public readonly updatedAt?: Date,
    public readonly updatedBy?: number,
    public readonly deletedAt?: Date,
    public readonly deletedBy?: number,
    public readonly isActive: boolean = true,
    public readonly isDeleted: boolean = false
  ) {}
}
