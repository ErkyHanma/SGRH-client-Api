export abstract class AuditEntity {
  created_at: Date = new Date();
  created_by?: number;
  updated_at?: Date;
  updated_by?: number;
  deleted_at?: Date;
  deleted_by?: number;
  is_active: boolean = true;
  is_deleted: boolean = false;
}
