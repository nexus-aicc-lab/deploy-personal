// src/app/personal/chat/ui/ChatRoomList.tsx
import { Search, Plus, MessageCircle } from 'lucide-react'
import { ChatRoomItem } from './ChatRoomItem'

interface ChatRoom {
    id: string
    name: string
    lastMessage: string
    lastMessageTime: string
    unreadCount: number
    isOnline: boolean
    participants: string[]
}

interface ChatRoomListProps {
    chatRooms: ChatRoom[]
    selectedChatId: string | null
    searchTerm: string
    onSearchChange: (term: string) => void
    onChatSelect: (chatId: string) => void
    onNewChat: () => void
}

export function ChatRoomList({
    chatRooms,
    selectedChatId,
    searchTerm,
    onSearchChange,
    onChatSelect,
    onNewChat
}: ChatRoomListProps) {

    const filteredChatRooms = chatRooms.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">채팅</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                            총 {filteredChatRooms.length}개
                        </span>
                        <button
                            onClick={onNewChat}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            새 채팅
                        </button>
                    </div>
                </div>

                {/* 검색바 */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="채팅방 또는 메시지 검색..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* 채팅방 목록 */}
            <div className="flex-1 overflow-y-auto py-2">
                {filteredChatRooms.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p>&ldquo;{searchTerm}&rdquo; 검색 결과가 없습니다</p>
                        </div>
                    </div>
                ) : (
                    filteredChatRooms.map((chat) => (
                        <ChatRoomItem
                            key={chat.id}
                            chat={chat}
                            isSelected={selectedChatId === chat.id}
                            onClick={onChatSelect}
                        />
                    ))
                )}
            </div>
        </div>
    )
}