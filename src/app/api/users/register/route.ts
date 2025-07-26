// src/app/api/users/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema/users';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, password } = body;

        // 입력값 검증
        if (!email || !name || !password) {
            return NextResponse.json(
                { message: '모든 필드를 입력해주세요.' },
                { status: 400 }
            );
        }

        // 이메일 중복 확인
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser.length > 0) {
            return NextResponse.json(
                { message: '이미 사용 중인 이메일입니다.' },
                { status: 400 }
            );
        }

        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성
        const newUser = await db
            .insert(users)
            .values({
                email,
                name,
                password: hashedPassword,
            })
            .returning();

        const createdUser = newUser[0];

        return NextResponse.json({
            id: createdUser.id,
            email: createdUser.email,
            name: createdUser.name,
            createdAt: createdUser.createdAt,
        });

    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json(
            { message: '회원가입 처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}