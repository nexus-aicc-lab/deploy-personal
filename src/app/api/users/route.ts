// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

// 토큰 검증 헬퍼 함수
function verifyToken(request: NextRequest): { userId: number; email: string } | null {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split(' ')[1];
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey') as any;
    } catch {
        return null;
    }
}

// GET: 사용자 목록 조회
export async function GET(request: NextRequest) {
    try {
        // 토큰 검증 (선택사항 - 보호하려면 주석 해제)
        // const user = verifyToken(request);
        // if (!user) {
        //   return NextResponse.json(
        //     { message: '인증이 필요합니다.' },
        //     { status: 401 }
        //   );
        // }

        const userList = await db
            .select({
                id: users.id,
                email: users.email,
                name: users.name,
                createdAt: users.createdAt,
            })
            .from(users)
            .orderBy(users.createdAt);

        return NextResponse.json(userList);

    } catch (error) {
        console.error('Get users error:', error);
        return NextResponse.json(
            { message: '사용자 목록 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}

// GET: 특정 사용자 조회 (선택사항)
export async function GET_USER_BY_ID(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = parseInt(params.id);

        const user = await db
            .select({
                id: users.id,
                email: users.email,
                name: users.name,
                createdAt: users.createdAt,
            })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (user.length === 0) {
            return NextResponse.json(
                { message: '사용자를 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        return NextResponse.json(user[0]);

    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { message: '사용자 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}