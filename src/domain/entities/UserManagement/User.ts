import { AuditEntity } from "../Base/AuditEntity";

export class User extends AuditEntity {
  constructor(
    public userId: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public passwordHash: string,
    public roleId: number,
    public phone?: string,
    public address?: string,
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
