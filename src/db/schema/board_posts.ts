// src/db/schema/board.ts
import { pgTable, uuid, text, varchar, timestamp, boolean, pgEnum, integer } from 'drizzle-orm/pg-core';

export const boardCategoryEnum = pgEnum('board_category', [
    'notice',
    'qa',
    'suggestions',
    'freeboard',
]);

export const boardPosts = pgTable('board_posts', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 200 }).notNull(),
    content: text('content').notNull(),
    category: boardCategoryEnum('category').notNull(),
    authorId: uuid('author_id').notNull(),
    authorName: varchar('author_name', { length: 100 }).notNull(), // 작성자명 캐싱용
    authorDepartment: varchar('author_department', { length: 100 }), // 부서명

    // 공지사항 전용 필드
    isImportant: boolean('is_important').default(false), // 중요 공지
    isPinned: boolean('is_pinned').default(false), // 상단 고정

    // 조회수
    viewCount: integer('view_count').default(0).notNull(),

    // QA 전용
    isSecret: boolean('is_secret').default(false),
    isAnonymous: boolean('is_anonymous').default(false),

    // 시간 정보
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),

    // 삭제 관련 (soft delete)
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
});