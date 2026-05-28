import { Hono } from "hono";

const app = new Hono()
  .basePath("/api")

console.log(`
    ╔═══════════════════════════════════════╗
    ║          Night Talk API Server        ║
    ╚═══════════════════════════════════════╝

    🚀  Server is running on port ${Bun.env.PORT}
    🌐  http://localhost:${Bun.env.PORT}

    Commands:
    - start: Start the server
    - dev: Start the server in development mode
    - db:generate: Generate database schema
    - db:push: Push database schema to the database
    - db:studio: Open Drizzle Studio
  `);

Bun.serve({
  fetch: app.fetch,
  port: Bun.env.PORT
})