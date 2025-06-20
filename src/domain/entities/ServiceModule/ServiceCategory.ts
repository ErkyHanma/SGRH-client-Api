import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class ServiceCategory extends AuditEntity {
  serviceCategoryId: number;
  serviceId: number;
  categoryId: number;
}
