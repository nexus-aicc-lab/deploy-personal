// src/db/scripts/insert-test-post.ts
import "dotenv/config";
import { db } from "../index";
import { posts } from "../schema/posts";

async function seed() {
    await db.insert(posts).values({
        title: "드리즐 사랑해",
        content: "진짜 너무 잘생긴 ORM이야 💙",
    });
    console.log("✅ 테스트 게시글 삽입 완료!");
}

seed();
