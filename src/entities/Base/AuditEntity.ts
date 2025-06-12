export abstract class AuditEntity {
  created_at: Date = new Date();
  created_by?: string;
  updated_at?: Date;
  updated_by?: string;
  deleted_at?: Date;
  deleted_by?: string;
  is_active: boolean = true;
  is_deleted: boolean = false;
}
