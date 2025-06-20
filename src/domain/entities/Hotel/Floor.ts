import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class Floor extends AuditEntity {
  floorId: number;
  floorNumber: number;
  description?: string;
  status: string = "active";
}
