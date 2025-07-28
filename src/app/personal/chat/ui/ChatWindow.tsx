// src/app/personal/chat/ui/ChatWindow.tsx
import { MessageCircle } from 'lucide-react'
import { ChatHeader } from './ChatHeader'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { useAuthStore } from '@/features/auth/store/authStore'
import { useMessages, useSendMessage } from '@/features/auth/hooks/useMessages'

interface Message {
    id: string
    senderId: string
    senderName: string
    content: string
    timestamp: string
    type: 'text' | 'image' | 'file'
    isMe: boolean
}

interface ChatRoom {
    id: string
    name: string
    participants: string[]
}

interface ChatWindowProps {
    selectedChat: ChatRoom | null
}

export function ChatWindow({ selectedChat }: ChatWindowProps) {
    // 현재 로그인한 사용자 정보 가져오기
    const { user } = useAuthStore()

    // 메시지 데이터 가져오기
    const { data: apiMessages, isLoading: messagesLoading, error: messagesError } = useMessages(selectedChat?.id || null)
    const sendMessageMutation = useSendMessage()

    // API 데이터를 UI 형식으로 변환
    const messages: Message[] = apiMessages?.map(msg => ({
        id: msg.id.toString(),
        senderId: msg.senderId.toString(),
        senderName: msg.senderName || '알 수 없음',
        content: msg.content,
        timestamp: new Date(msg.createdAt).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        type: msg.type as 'text' | 'image' | 'file',
        isMe: user ? msg.senderId === user.id : false // 현재 로그인한 사용자와 비교
    })).reverse() || [] // 시간순 정렬 (오래된 것부터)

    const handleSendMessage = async (message: string) => {
        if (!selectedChat || !user) {
            console.error('채팅방 또는 사용자 정보가 없습니다')
            return
        }

        try {
            await sendMessageMutation.mutateAsync({
                chatRoomId: selectedChat.id,
                content: message,
                userId: user.id // 현재 로그인한 사용자 ID 전달
            })
        } catch (error) {
            console.error('메시지 전송 실패:', error)
        }
    }

    // 로그인하지 않은 경우
    if (!user) {
        return (
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <p>로그인이 필요합니다</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!selectedChat) {
        return (
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <p>채팅방을 선택해주세요</p>
                    </div>
                </div>
            </div>
        )
    }

    // 메시지 로딩 상태
    if (messagesLoading) {
        return (
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <ChatHeader chat={selectedChat} />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">메시지를 불러오는 중...</p>
                </div>
                <MessageInput onSendMessage={handleSendMessage} />
            </div>
        )
    }

    // 메시지 에러 상태
    if (messagesError) {
        return (
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <ChatHeader chat={selectedChat} />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-red-500">메시지를 불러오는데 실패했습니다: {messagesError.message}</p>
                </div>
                <MessageInput onSendMessage={handleSendMessage} />
            </div>
        )
    }

    return (
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <ChatHeader chat={selectedChat} />
            <MessageList messages={messages} />
            <MessageInput
                onSendMessage={handleSendMessage}
                disabled={sendMessageMutation.isPending}
            />
            {sendMessageMutation.isPending && (
                <div className="px-6 py-2 bg-gray-50 border-t">
                    <p className="text-sm text-gray-500">메시지 전송 중...</p>
                </div>
            )}
        </div>
    )
}