import {
  pgSchema,
  serial,
  varchar,
  text,
  numeric,
  boolean,
  date,
  integer,
} from "drizzle-orm/pg-core";

// Definición del schema
export const servicesModule = pgSchema("servicesmodule");

// Tabla: services
export const servicesTable = servicesModule.table("services", {
  service_id: serial("service_id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  is_active: boolean("is_active").default(true),
  is_deleted: boolean("is_deleted").default(false),
  created_at: date("created_at").defaultNow(),
  created_by: integer("created_by"),
  updated_at: date("updated_at"),
  updated_by: integer("updated_by"),
  deleted_at: date("deleted_at"),
  deleted_by: integer("deleted_by"),
});
