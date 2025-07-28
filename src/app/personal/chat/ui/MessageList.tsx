// src/app/personal/chat/ui/MessageList.tsx
import { useRef, useEffect } from 'react'

interface Message {
    id: string
    senderId: string
    senderName: string
    content: string
    timestamp: string
    type: 'text' | 'image' | 'file'
    isMe: boolean
}

interface MessageListProps {
    messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const formatTime = (timeString: string) => {
        return timeString
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                    <div className={`max-w-[70%] ${message.isMe ? 'order-2' : 'order-1'}`}>
                        {!message.isMe && (
                            <p className="text-xs text-gray-500 mb-1 ml-2">
                                {message.senderName}
                            </p>
                        )}
                        <div
                            className={`px-4 py-3 rounded-lg ${message.isMe
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                {message.content}
                            </p>
                        </div>
                        <p className={`text-xs text-gray-400 mt-2 ${message.isMe ? 'text-right mr-2' : 'ml-2'
                            }`}>
                            {formatTime(message.timestamp)}
                        </p>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}