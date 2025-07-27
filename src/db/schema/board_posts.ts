import { pgTable, uuid, text, varchar, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core';

// 게시판 타입 ENUM 정의
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
    authorId: uuid('author_id').notNull(), // FK (사용자 테이블과 연결)
    isSecret: boolean('is_secret').default(false), // QA에서만 사용 가능
    isAnonymous: boolean('is_anonymous').default(false), // suggestion용
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
