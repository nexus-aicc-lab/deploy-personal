// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema/users'

// GET /api/users
export async function GET(_request: NextRequest) {
    try {
        const userList = await db
            .select({
                id: users.id,
                email: users.email,
                name: users.name,
                createdAt: users.createdAt,
            })
            .from(users)
            .orderBy(users.createdAt)

        return NextResponse.json(userList)
    } catch (error) {
        console.error('Get users error:', error)
        return NextResponse.json(
            { message: '사용자 목록 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}
