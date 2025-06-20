import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class User extends AuditEntity {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  roleId: number;
  phone?: string;
  address?: string;
}
