import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgSchema,
  serial,
  varchar,
  text,
  integer,
  boolean,
  date,
} from "drizzle-orm/pg-core";

export const userManagement = pgSchema("usermanagement");

export const rolesTable = userManagement.table("roles", {
  roleId: serial("role_id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
});

export const usersTable = userManagement.table("users", {
  userId: serial("user_id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  passwordHash: text("password_hash").notNull(),
  roleId: integer("role_id").notNull(),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  isActive: boolean("is_active").default(true),
  isDeleted: boolean("is_deleted").default(false),
  createdBy: integer("created_by"),
  updatedAt: date("updated_at"),
  updatedBy: integer("updated_by"),
  deletedAt: date("deleted_at"),
  deletedBy: integer("deleted_by"),
});

// Type for selecting data (e.g. SELECT * FROM users)
export type UserModel = InferSelectModel<typeof usersTable>;
