// src\app\api\auth\signup\route.ts
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { hashPassword } from "@/shared/lib/hash";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password, name } = await req.json();

    // 이메일 중복 검사
    const existing = await db.select().from(users).where(eq(users.email, email));
    if (existing.length > 0) {
        return NextResponse.json({ error: "이미 등록된 이메일입니다." }, { status: 409 });
    }

    // 비밀번호 해시
    const hashed = await hashPassword(password);

    // DB에 저장
    const result = await db.insert(users).values({
        email,
        password: hashed,
        name,
    }).returning();

    const newUser = result[0];

    return NextResponse.json({
        message: "회원가입 성공!",
        user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
        }
    });
}
