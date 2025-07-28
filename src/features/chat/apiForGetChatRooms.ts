// src/features/chat/api/apiForGetChatRooms.ts

export interface ChatRoom {
    id: number
    name: string
    type: string
    createdAt: string
    lastMessage?: string
    lastMessageTime?: string
    unreadCount?: number
    isOnline?: boolean
    participants?: string[]
}

export async function apiForGetChatRooms(): Promise<ChatRoom[]> {
    try {
        const response = await fetch('/api/chat/rooms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('채팅방 목록 조회 실패:', error)
        throw error
    }
}