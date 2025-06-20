import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class Rate extends AuditEntity {
  rateId: number;
  categoryId: number;
  seasonId: number;
  nightPrice: number;
}
