// src/app/api/auth/login/route.ts
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { comparePassword } from "@/shared/lib/hash";
import { signJwt } from "@/shared/lib/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const found = await db.select().from(users).where(eq(users.email, email));
    const user = found[0];

    if (!user) {
        return NextResponse.json({ error: "유저를 찾을 수 없습니다." }, { status: 401 });
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
        return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
    }

    const token = signJwt({ id: user.id, email: user.email });

    return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name } });
}
