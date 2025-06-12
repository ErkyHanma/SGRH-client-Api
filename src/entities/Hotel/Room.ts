import { AuditEntity } from "@entities/Base/AuditEntity";

export class Room extends AuditEntity {
  roomId: number;
  roomNumber: string = "";
  categoryId: number;
  floorId: number;
  description?: string;
  roomImgUrl?: string;
  status: string = "available";
}
