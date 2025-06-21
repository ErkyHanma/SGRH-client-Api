export abstract class AuditEntity {
  constructor(
    public readonly createdAt: Date = new Date(),
    public readonly createdBy: number | null,
    public readonly updatedAt: Date | null,
    public readonly updatedBy: number | null,
    public readonly deletedAt: Date | null,
    public readonly deletedBy: number | null,
    public readonly isActive: boolean = true,
    public readonly isDeleted: boolean = false
  ) {}
}
