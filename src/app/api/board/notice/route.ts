// src/app/api/board/notice/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { eq, desc, and, isNull, count, or, like } from 'drizzle-orm';
import { boardPosts } from '@/db/schema/board_posts';
import crypto from 'crypto'; // 이 import가 있는지 확인!

// GET /api/board/notice
export async function GET(request: NextRequest) {
    try {
        // 쿼리 파라미터 가져오기
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search') || '';

        // offset 계산
        const offset = (page - 1) * limit;

        // 조건 설정
        const conditions = [
            eq(boardPosts.category, 'notice'),
            isNull(boardPosts.deletedAt)
        ];

        // 검색 조건 추가 (선택사항)
        if (search) {
            const searchCondition = or(
                like(boardPosts.title, `%${search}%`),
                like(boardPosts.content, `%${search}%`)
            );
            if (searchCondition) {
                conditions.push(searchCondition);
            }
        }

        // 전체 개수 조회
        const [totalResult] = await db
            .select({ count: count() })
            .from(boardPosts)
            .where(and(...conditions));

        const total = totalResult?.count || 0;

        // 데이터 조회
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
            .where(and(...conditions))
            .orderBy(
                desc(boardPosts.isPinned),
                desc(boardPosts.isImportant),
                desc(boardPosts.createdAt)
            )
            .limit(limit)
            .offset(offset);

        // 총 페이지 수 계산
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            notices,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasMore: page < totalPages
            }
        });
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

        // 유효한 UUID 생성 - 이 부분이 중요!
        const validUUID = crypto.randomUUID();

        console.log('Generated UUID:', validUUID); // 디버깅용

        const [newNotice] = await db
            .insert(boardPosts)
            .values({
                title,
                content,
                category: 'notice',
                authorId: validUUID, // ✅ 유효한 UUID 사용!
                authorName: '관리자',
                authorDepartment: '시스템관리팀',
                isImportant: isImportant || false,
                isPinned: isPinned || false,
                viewCount: 0,
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