// src/app/personal/chat/ui/ChatRoomItem.tsx
import { User } from 'lucide-react'

interface ChatRoomItemProps {
    chat: {
        id: string
        name: string
        lastMessage: string
        lastMessageTime: string
        unreadCount: number
        isOnline: boolean
        participants: string[]
    }
    isSelected: boolean
    onClick: (chatId: string) => void
}

export function ChatRoomItem({ chat, isSelected, onClick }: ChatRoomItemProps) {
    return (
        <div
            onClick={() => onClick(chat.id)}
            className={`p-5 mx-2 mb-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500 shadow-sm' : 'hover:shadow-sm'
                }`}
        >
            <div className="flex items-start gap-3">
                {/* 아바타 */}
                <div className="relative">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                    </div>
                    {chat.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-800 truncate">
                            {chat.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                                {chat.lastMessageTime}
                            </span>
                            {chat.unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[18px] text-center">
                                    {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                    </p>
                    {chat.participants.length > 1 && (
                        <p className="text-xs text-gray-400 mt-1">
                            {chat.participants.join(', ')}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}