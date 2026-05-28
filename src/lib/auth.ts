import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/database/db";
import { openAPI } from "better-auth/plugins";
import { user, session, account, verification, userRelations, sessionRelations, accountRelations } from "@/database/schema";
import { expo } from "@better-auth/expo";

const BETTER_AUTH_URL = 
  (typeof Bun !== "undefined")
    ? Bun.env.BETTER_AUTH_URL
    : process.env.BETTER_AUTH_URL

const BETTER_AUTH_SECRET =
  (typeof Bun !== "undefined")
    ? Bun.env.BETTER_AUTH_SECRET
    : process.env.BETTER_AUTH_SECRET

const GOOGLE_CLIENT_ID =
  (typeof Bun !== "undefined")
    ? Bun.env.GOOGLE_CLIENT_ID
    : process.env.GOOGLE_CLIENT_ID

const GOOGLE_CLIENT_SECRET =
  (typeof Bun !== "undefined")
    ? Bun.env.GOOGLE_CLIENT_SECRET
    : process.env.GOOGLE_CLIENT_SECRET

// EXPO DEV exp:// scheme
const EXPO_DEV_ORIGIN = 
  (Bun.env.NODE_ENV === "development" || process.env.NODE_ENV === "development")
    ? ["exp://", "exp://*", "exp://192.168.*.*:*/**"]
    : []


export const auth = betterAuth({
  appName: "Night Talk",
  baseUrl: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
  basePath: "/v1/auth",
  trustedOrigins: [
    "nighttalk://",
    "nighttalk://*",
    ...EXPO_DEV_ORIGIN,
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
      userRelations,
      sessionRelations,
      accountRelations,
    }
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    openAPI(),
    expo()
  ]
})