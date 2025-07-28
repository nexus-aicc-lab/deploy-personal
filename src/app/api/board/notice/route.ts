// src\app\api\board\notice\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { eq, desc, and, isNull } from 'drizzle-orm';
import { boardPosts } from '@/db/schema/board_posts';

// GET /api/board/notice
export async function GET(request: NextRequest) {
    try {
        const notices = await db
            .select({
                id: boardPosts.id,
                title: boardPosts.title,
                authorName: boardPosts.authorName,
                authorDepartment: boardPosts.authorDepartment,
                viewCount: boardPosts.viewCount,
                isImportant: boardPosts.isImportant,
                isPinned: boardPosts.isPinned,
                createdAt: boardPosts.createdAt,
            })
            .from(boardPosts)
            .where(
                and(
                    eq(boardPosts.category, 'notice'),
                    isNull(boardPosts.deletedAt)
                )
            )
            .orderBy(
                desc(boardPosts.isPinned),
                desc(boardPosts.isImportant),
                desc(boardPosts.createdAt)
            );

        return NextResponse.json({ notices });
    } catch (error) {
        console.error('Get notices error:', error);
        return NextResponse.json(
            { error: '공지사항 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}

// POST /api/board/notice (관리자용)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, content, isImportant, isPinned } = body;

        // TODO: 인증 확인 및 관리자 권한 체크

        const [newNotice] = await db
            .insert(boardPosts)
            .values({
                title,
                content,
                category: 'notice',
                authorId: 'admin-uuid', // 실제로는 세션에서 가져와야 함
                authorName: '관리자',
                authorDepartment: '시스템관리팀',
                isImportant: isImportant || false,
                isPinned: isPinned || false,
            })
            .returning();

        return NextResponse.json({ notice: newNotice }, { status: 201 });
    } catch (error) {
        console.error('Create notice error:', error);
        return NextResponse.json(
            { error: '공지사항 작성 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}