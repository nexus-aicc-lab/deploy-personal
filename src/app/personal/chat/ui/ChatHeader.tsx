// src/app/personal/chat/ui/ChatHeader.tsx
import { User, Phone, Video, MoreVertical } from 'lucide-react'

interface ChatHeaderProps {
    chat: {
        id: string
        name: string
        participants: string[]
    }
}

export function ChatHeader({ chat }: ChatHeaderProps) {
    return (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {chat.name}
                        </h3>
                        {chat.participants.length > 1 && (
                            <p className="text-sm text-gray-500">
                                {chat.participants.length}명
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
                        <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}