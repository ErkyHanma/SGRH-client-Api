import { AuditEntity } from "@entities/Base/AuditEntity";

export class RoomCategory extends AuditEntity {
  categoryId: number;
  name: string;
  description: string;
  maxCapacity: number;
  amenities: string;
}
