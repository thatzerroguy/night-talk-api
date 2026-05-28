import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const DATABASE_URL = 
  (typeof Bun !== "undefined")
    ? Bun.env.DATABASE_URL
    : process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

function onConnect() {
  return console.log("Connected to Database")
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  onConnect,
})

export const db = drizzle({ client: pool });