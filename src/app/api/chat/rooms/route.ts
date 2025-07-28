import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { chatRooms } from '@/db/schema'

export async function GET() {
    try {
        const rooms = await db
            .select({
                id: chatRooms.id,
                name: chatRooms.name,
                type: chatRooms.type,
                createdAt: chatRooms.createdAt,
            })
            .from(chatRooms)

        return NextResponse.json(rooms)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 })
    }
}