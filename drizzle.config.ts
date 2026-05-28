import { defineConfig } from "drizzle-kit";

const DATABASE_URL = 
  (typeof Bun !== "undefined")
    ? Bun.env.DATABASE_URL
    : process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema/index.ts",
  out: "./src/database/migrations",
  dbCredentials: {
    url: DATABASE_URL,
  }
})