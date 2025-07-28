// src/db/schema/users.ts
import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(), // 나중에 bcrypt로 암호화
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});