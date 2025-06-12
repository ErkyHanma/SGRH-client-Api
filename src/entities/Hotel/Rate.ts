import { AuditEntity } from "@entities/Base/AuditEntity";

export class Rate extends AuditEntity {
  rateId: number;
  categoryId: number;
  seasonId: number;
  nightPrice: number;
}
