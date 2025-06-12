import { AuditEntity } from "@entities/Base/AuditEntity";

export class Service extends AuditEntity {
  service_id?: number;
  mame: string;
  description: string;
  price: number;
}
