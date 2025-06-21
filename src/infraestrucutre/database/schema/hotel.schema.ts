import {
  serial,
  integer,
  varchar,
  text,
  numeric,
  boolean,
  date,
  pgSchema,
} from "drizzle-orm/pg-core";

export const hotel = pgSchema("hotel");

export const floorsTable = hotel.table(
  "floors",
  {
    floor_id: serial("floor_id").primaryKey(),
    floor_number: integer("floor_number").notNull(),
    description: text("description"),
    status: varchar("status", { length: 50 }),
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
      expression: `status IN ('active', 'inactive', 'maintenance')`,
    },
  })
);

export const room_categoryTable = hotel.table("room_category", {
  category_id: serial("category_id").primaryKey(),
  name: varchar("name", { length: 100 }),
  description: text("description"),
  max_capacity: integer("max_capacity"),
  amenities: text("amenities"),
  is_active: boolean("is_active").default(true),
  is_deleted: boolean("is_deleted").default(false),
  created_at: date("created_at").defaultNow(),
  created_by: integer("created_by"),
  updated_at: date("updated_at"),
  updated_by: integer("updated_by"),
  deleted_at: date("deleted_at"),
  deleted_by: integer("deleted_by"),
});

export const roomsTable = hotel.table(
  "rooms",
  {
    room_id: serial("room_id").primaryKey(),
    room_number: varchar("room_number", { length: 10 }).notNull(),
    category_id: integer("category_id").references(
      () => room_categoryTable.category_id
    ),
    floor_id: integer("floor_id").references(() => floorsTable.floor_id),
    description: text("description"),
    room_img_url: text("room_img_url"),
    status: varchar("status", { length: 20 }),
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
      expression: `status IN ('available', 'occupied', 'maintenance')`,
    },
  })
);

export const seasonTable = hotel.table("season", {
  season_id: serial("season_id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description"),
  start_date: date("start_date"),
  end_date: date("end_date"),
});

export const rateTable = hotel.table("rate", {
  rate_id: serial("rate_id").primaryKey(),
  category_id: integer("category_id").references(
    () => room_categoryTable.category_id
  ),
  season_id: integer("season_id").references(() => seasonTable.season_id),
  night_price: numeric("night_price", { precision: 10, scale: 2 }),
  is_active: boolean("is_active").default(true),
  is_deleted: boolean("is_deleted").default(false),
  created_at: date("created_at").defaultNow(),
  created_by: integer("created_by"),
  updated_at: date("updated_at"),
  updated_by: integer("updated_by"),
  deleted_at: date("deleted_at"),
  deleted_by: integer("deleted_by"),
});
