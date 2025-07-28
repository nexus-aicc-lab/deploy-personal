// src/app/api/chat/rooms/[id]/messages/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import { messages, users } from '@/db/schema'

// 메시지 목록 조회
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params
        const chatRoomId = parseInt(resolvedParams.id)

        if (isNaN(chatRoomId)) {
            return NextResponse.json({ error: 'Invalid chat room ID' }, { status: 400 })
        }

        const messageList = await db
            .select({
                id: messages.id,
                chatRoomId: messages.chatRoomId,
                senderId: messages.senderId,
                content: messages.content,
                type: messages.type,
                createdAt: messages.createdAt,
                senderName: users.name,
            })
            .from(messages)
            .leftJoin(users, eq(messages.senderId, users.id))
            .where(eq(messages.chatRoomId, chatRoomId))
            .orderBy(desc(messages.createdAt))

        return NextResponse.json(messageList)
    } catch (error) {
        console.error('메시지 조회 실패:', error)
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }
}

// 메시지 전송
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params
        const chatRoomId = parseInt(resolvedParams.id)
        const body = await request.json()
        const { content, type = 'text', userId } = body // userId 추가

        if (isNaN(chatRoomId)) {
            return NextResponse.json({ error: 'Invalid chat room ID' }, { status: 400 })
        }

        if (!content) {
            return NextResponse.json({ error: 'Content is required' }, { status: 400 })
        }

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        // 사용자 존재 여부 확인
        const existingUser = await db.select().from(users).where(eq(users.id, userId)).limit(1)

        if (existingUser.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const [newMessage] = await db
            .insert(messages)
            .values({
                chatRoomId,
                senderId: userId,
                content,
                type,
            })
            .returning()

        // 발신자 정보와 함께 반환
        const messageWithSender = await db
            .select({
                id: messages.id,
                chatRoomId: messages.chatRoomId,
                senderId: messages.senderId,
                content: messages.content,
                type: messages.type,
                createdAt: messages.createdAt,
                senderName: users.name,
            })
            .from(messages)
            .leftJoin(users, eq(messages.senderId, users.id))
            .where(eq(messages.id, newMessage.id))

        return NextResponse.json(messageWithSender[0], { status: 201 })
    } catch (error) {
        console.error('메시지 전송 실패:', error)
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }
}