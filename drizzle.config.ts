import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default {
    schema: "./src/db/schema",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        host: "localhost",
        port: 5435,
        user: "user",           // ← 너가 env에 쓴 PostgreSQL 사용자명
        password: "password",   // ← 너가 env에 쓴 비밀번호
        database: "mydeploypersonaldb",
        ssl: false, // ← 이거 추가!!!
    },
} satisfies Config;
