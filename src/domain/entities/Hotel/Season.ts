import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class Season extends AuditEntity {
  seasonId: number;
  name: string = "";
  description?: string;
  startDate?: Date;
  endDate?: Date;
}
