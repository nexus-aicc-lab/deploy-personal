// src/app/api/board/notice/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { eq, and, isNull, sql } from 'drizzle-orm';
import { boardPosts } from '@/db/schema/board_posts';

// GET /api/board/notice/:id
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // 조회수 증가와 동시에 데이터 조회
        const [notice] = await db
            .update(boardPosts)
            .set({
                viewCount: sql`${boardPosts.viewCount} + 1`
            })
            .where(
                and(
                    eq(boardPosts.id, id),
                    eq(boardPosts.category, 'notice'),
                    isNull(boardPosts.deletedAt)
                )
            )
            .returning();

        if (!notice) {
            return NextResponse.json(
                { error: '공지사항을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ notice });
    } catch (error) {
        console.error('Get notice detail error:', error);
        return NextResponse.json(
            { error: '공지사항 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}