// src/app/personal/chat/ui/MessageInput.tsx
import { useState } from 'react'
import { Send } from 'lucide-react'

interface MessageInputProps {
    onSendMessage: (message: string) => void
    disabled?: boolean
}

export function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
    const [newMessage, setNewMessage] = useState('')

    const handleSendMessage = () => {
        if (newMessage.trim() && !disabled) {
            onSendMessage(newMessage)
            setNewMessage('')
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !disabled) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-end gap-4">
                <div className="flex-1">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={disabled ? "메시지 전송 중..." : "메시지를 입력하세요..."}
                        rows={1}
                        disabled={disabled}
                        className={`w-full px-4 py-3 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''
                            }`}
                        style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                </div>
                <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || disabled}
                    className={`p-3 rounded-lg transition-colors ${newMessage.trim() && !disabled
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}