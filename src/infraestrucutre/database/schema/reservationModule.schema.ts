import {
  pgSchema,
  serial,
  integer,
  varchar,
  date,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";

export const reservationModule = pgSchema("reservationmodule");

export const reservationsTable = reservationModule.table(
  "reservations",
  {
    reservation_id: serial("reservation_id").primaryKey(),
    client_id: integer("client_id"),
    room_id: integer("room_id"),
    start_date: date("start_date").notNull(),
    end_date: date("end_date").notNull(),
    reservation_date: date("reservation_date").defaultNow(),
    status: varchar("status", { length: 50 }).notNull(),
    guest_count: integer("guest_count").default(1),
    payment_amount: numeric("payment_amount", { precision: 10, scale: 2 }),
    is_active: boolean("is_active").default(true),
    is_deleted: boolean("is_deleted").default(false),
    created_at: date("created_at").defaultNow(),
    created_by: integer("created_by"),
    updated_at: date("updated_at"),
    updated_by: integer("updated_by"),
    deleted_at: date("deleted_at"),
    deleted_by: integer("deleted_by"),
  },
  (table) => ({
    statusCheck: {
      name: "status_check",
      expression: `status IN ('Pending', 'Confirmed', 'CheckedIn', 'CheckedOut', 'Cancelled', 'NoShow')`,
    },
    dateCheck: {
      name: "chk_dates_valid",
      expression: "end_date > start_date",
    },
  })
);

export const reservationServiceTable = reservationModule.table(
  "reservation_service",
  {
    reservation_service_id: serial("reservation_service_id").primaryKey(),
    reservation_id: integer("reservation_id"),
    service_id: integer("service_id"),
    is_active: boolean("is_active").default(true),
    is_deleted: boolean("is_deleted").default(false),
    created_at: date("created_at").defaultNow(),
    created_by: integer("created_by"),
    updated_at: date("updated_at"),
    updated_by: integer("updated_by"),
    deleted_at: date("deleted_at"),
    deleted_by: integer("deleted_by"),
  }
);
