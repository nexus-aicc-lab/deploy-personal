// C:\deploy-server\deploy-personal\drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
} satisfies Config;
