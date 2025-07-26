// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema/users';

// GET: 특정 사용자 조회
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const userId = parseInt(params.id);

        if (isNaN(userId)) {
            return NextResponse.json(
                { message: '유효하지 않은 사용자 ID입니다.' },
                { status: 400 }
            );
        }

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