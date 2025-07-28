// src/features/chat/api/apiForGetMessages.ts

export interface Message {
    id: number
    chatRoomId: number
    senderId: number
    content: string
    type: string
    createdAt: string
    senderName?: string
}

export async function apiForGetMessages(chatRoomId: string | number): Promise<Message[]> {
    try {
        const response = await fetch(`/api/chat/rooms/${chatRoomId}/messages`, {
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
        console.error('메시지 목록 조회 실패:', error)
        throw error
    }
}

// userId 파라미터 추가
export async function apiForSendMessage(chatRoomId: string | number, content: string, userId: number): Promise<Message> {
    try {
        const response = await fetch(`/api/chat/rooms/${chatRoomId}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
                type: 'text',
                userId // 현재 로그인한 사용자 ID 전송
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('메시지 전송 실패:', error)
        throw error
    }
}