// src/app/api/users/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema/users';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // 입력값 검증
        if (!email || !password) {
            return NextResponse.json(
                { message: '이메일과 비밀번호를 입력해주세요.' },
                { status: 400 }
            );
        }

        // 사용자 조회
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (user.length === 0) {
            return NextResponse.json(
                { message: '존재하지 않는 이메일입니다.' },
                { status: 401 }
            );
        }

        const foundUser = user[0];

        // 비밀번호 검증
        const isValidPassword = await bcrypt.compare(password, foundUser.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { message: '비밀번호가 일치하지 않습니다.' },
                { status: 401 }
            );
        }

        // JWT 토큰 생성
        const token = jwt.sign(
            {
                userId: foundUser.id,
                email: foundUser.email,
            },
            process.env.JWT_SECRET || 'mysecretkey',
            { expiresIn: '7d' }
        );

        // 응답
        return NextResponse.json({
            token,
            userId: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: '로그인 처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}