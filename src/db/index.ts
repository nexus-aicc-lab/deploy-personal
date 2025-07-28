// src/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// .env.local 파일을 명시적으로 로드
dotenv.config({ path: '.env.local' });

// 디버깅을 위한 로그
console.log('DB 설정 로드됨:', {
    url: process.env.DATABASE_URL ? '✅' : '❌',
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // 연결 재시도 옵션
    connectionTimeoutMillis: 5000,
    max: 20,
});

// 연결 테스트
pool.connect((err, client, release) => {
    if (err) {
        console.error('DB 연결 에러:', err);
    } else {
        console.log('DB 연결 성공!');
        release();
    }
});

export const db = drizzle(pool);