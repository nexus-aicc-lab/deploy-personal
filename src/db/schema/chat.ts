import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";
import { users } from './users'

export const chatRooms = pgTable("chat_rooms", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const chatParticipants = pgTable("chat_participants", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    chatRoomId: integer("chat_room_id").references(() => chatRooms.id).notNull(),
    userId: integer("user_id").references(() => users.id).notNull(),
    joinedAt: timestamp("joined_at").defaultNow(),
});

export const messages = pgTable("messages", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    chatRoomId: integer("chat_room_id").references(() => chatRooms.id).notNull(),
    senderId: integer("sender_id").references(() => users.id).notNull(),
    content: text("content").notNull(),
    type: text("type").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});