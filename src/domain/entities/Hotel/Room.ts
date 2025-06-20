import { AuditEntity } from "@domain/entities/Base/AuditEntity";

export class Room extends AuditEntity {
  roomId: number;
  roomNumber: string = "";
  categoryId: number;
  floorId: number;
  description?: string;
  roomImgUrl?: string;
  status: string = "available";
}
