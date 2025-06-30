import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: [
    "./src/infraestrucutre/database/schema/userManagement.schema.ts",
    "./src/infraestrucutre/database/schema/hotel.schema.ts",
    "./src/infraestrucutre/database/schema/servicesModule.schema.ts",
    "./src/infraestrucutre/database/schema/reservationModule.schema.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
