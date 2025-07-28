// src/app/personal/chat/ui/ChatPage.tsx
'use client'

import { useChatRooms } from '@/features/auth/hooks/useChatRooms'
import React, { useState, useEffect } from 'react'
import { ChatRoomList } from './ui/ChatRoomList'
import { ChatWindow } from './ui/ChatWindow'

// 타입 정의
interface ChatRoom {
    id: string
    name: string
    lastMessage: string
    lastMessageTime: string
    unreadCount: number
    isOnline: boolean
    participants: string[]
}

export default function ChatPage() {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    // 실제 API 데이터 사용
    const { data: apiChatRooms, isLoading, error } = useChatRooms()
    // API 데이터를 UI 형식으로 변환
    const chatRooms: ChatRoom[] = apiChatRooms?.map(room => ({
        id: room.id.toString(),
        name: room.name,
        lastMessage: '최근 메시지가 없습니다', // 나중에 실제 데이터로 교체
        lastMessageTime: new Date(room.createdAt).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        unreadCount: 0, // 나중에 실제 데이터로 교체
        isOnline: true, // 나중에 실제 데이터로 교체
        participants: [room.name] // 임시로 채팅방 이름 사용
    })) || []

    // 선택된 채팅방 정보
    const selectedChat = chatRooms.find(chat => chat.id === selectedChatId)

    // 첫 번째 채팅방 자동 선택
    useEffect(() => {
        if (chatRooms.length > 0 && !selectedChatId) {
            setSelectedChatId(chatRooms[0].id)
        }
    }, [chatRooms, selectedChatId])

    const handleChatSelect = (chatId: string) => {
        setSelectedChatId(chatId)
    }

    const handleNewChat = () => {
        // 새 채팅방 생성 로직
        console.log('새 채팅방 생성')
    }

    // 로딩 상태
    if (isLoading) {
        return (
            <div className="flex gap-8 h-[calc(100vh-200px)] p-2">
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">채팅방 목록을 불러오는 중...</p>
                </div>
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200"></div>
            </div>
        )
    }

    // 에러 상태
    if (error) {
        return (
            <div className="flex gap-8 h-[calc(100vh-200px)] p-2">
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                    <p className="text-red-500">채팅방 목록을 불러오는데 실패했습니다: {error.message}</p>
                </div>
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200"></div>
            </div>
        )
    }

    return (
        <div className="flex gap-8 h-[calc(100vh-200px)] p-2">
            <ChatRoomList
                chatRooms={chatRooms}
                selectedChatId={selectedChatId}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onChatSelect={handleChatSelect}
                onNewChat={handleNewChat}
            />
            <ChatWindow
                selectedChat={selectedChat ? {
                    id: selectedChat.id,
                    name: selectedChat.name,
                    participants: selectedChat.participants
                } : null}
            />
        </div>
    )
}