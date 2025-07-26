// src/db/test-connection.ts
import "dotenv/config"; // 🔥 이거 하나로 끝남
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function test() {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ DB 연결 성공:", result.rows[0]);
}

test();
