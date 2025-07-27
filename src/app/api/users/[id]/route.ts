// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'

// GET /api/users/:id
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const userId = parseInt(params.id, 10)
        const [user] = await db
            .select({
                id: users.id,
                email: users.email,
                name: users.name,
                createdAt: users.createdAt,
            })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1)

        if (!user) {
            return NextResponse.json(
                { message: '사용자를 찾을 수 없습니다.' },
                { status: 404 }
            )
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error('Get user by id error:', error)
        return NextResponse.json(
            { message: '사용자 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}
