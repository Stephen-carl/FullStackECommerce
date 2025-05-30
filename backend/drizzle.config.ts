// drizzle.config.ts
import "dotenv/config";                    
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: ['./src/db/*.ts'],       
  out: "./drizzle/migrations",            // where to write SQL migrations
  dialect: 'postgresql',           // Postgres dialect
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
