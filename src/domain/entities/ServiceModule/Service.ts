import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class Service extends AuditEntity {
  service_id?: number;
  name: string;
  description: string;
  price: number;
}
