'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, Send, User, MessageCircle, Clock, Phone, Video, MoreVertical, Plus } from 'lucide-react'

// Mock 데이터 타입 정의
interface ChatRoom {
    id: string
    name: string
    lastMessage: string
    lastMessageTime: string
    unreadCount: number
    isOnline: boolean
    avatar?: string
    participants: string[]
}

interface Message {
    id: string
    senderId: string
    senderName: string
    content: string
    timestamp: string
    type: 'text' | 'image' | 'file'
    isMe: boolean
}

// Mock 데이터
const mockChatRooms: ChatRoom[] = [
    {
        id: '1',
        name: '김철수',
        lastMessage: '네, 내일 회의 자료 준비해서 보내드릴게요!',
        lastMessageTime: '14:32',
        unreadCount: 2,
        isOnline: true,
        participants: ['김철수']
    },
    {
        id: '2',
        name: '마케팅팀 단톡방',
        lastMessage: '이번 캠페인 기획안 어떻게 생각하시나요?',
        lastMessageTime: '13:45',
        unreadCount: 0,
        isOnline: false,
        participants: ['박영희', '이민수', '정다은', '최준호']
    },
    {
        id: '3',
        name: '박영희',
        lastMessage: '프로젝트 진행 상황 공유드립니다.',
        lastMessageTime: '12:20',
        unreadCount: 1,
        isOnline: true,
        participants: ['박영희']
    },
    {
        id: '4',
        name: '개발팀',
        lastMessage: '버그 수정 완료했습니다.',
        lastMessageTime: '11:30',
        unreadCount: 0,
        isOnline: false,
        participants: ['김개발', '이코딩', '박프론트']
    },
    {
        id: '5',
        name: '이민수',
        lastMessage: '점심 메뉴 추천 부탁드려요~',
        lastMessageTime: '10:15',
        unreadCount: 5,
        isOnline: false,
        participants: ['이민수']
    }
]

const mockMessages: { [key: string]: Message[] } = {
    '1': [
        {
            id: '1',
            senderId: 'user1',
            senderName: '김철수',
            content: '안녕하세요! 내일 회의 준비는 어떻게 되고 있나요?',
            timestamp: '14:20',
            type: 'text',
            isMe: false
        },
        {
            id: '2',
            senderId: 'me',
            senderName: '나',
            content: '안녕하세요! 회의 자료는 거의 완성되었고, 내일 오전에 최종 검토 후 보내드릴 예정입니다.',
            timestamp: '14:25',
            type: 'text',
            isMe: true
        },
        {
            id: '3',
            senderId: 'user1',
            senderName: '김철수',
            content: '네, 내일 회의 자료 준비해서 보내드릴게요!',
            timestamp: '14:32',
            type: 'text',
            isMe: false
        }
    ],
    '2': [
        {
            id: '1',
            senderId: 'user2',
            senderName: '박영희',
            content: '안녕하세요 여러분! 이번 분기 마케팅 캠페인 기획안을 공유드립니다.',
            timestamp: '13:30',
            type: 'text',
            isMe: false
        },
        {
            id: '2',
            senderId: 'user3',
            senderName: '이민수',
            content: '좋은 아이디어네요! 타겟 고객층 분석이 특히 인상깊습니다.',
            timestamp: '13:40',
            type: 'text',
            isMe: false
        },
        {
            id: '3',
            senderId: 'user4',
            senderName: '정다은',
            content: '이번 캠페인 기획안 어떻게 생각하시나요?',
            timestamp: '13:45',
            type: 'text',
            isMe: false
        }
    ]
}

const ChatPage = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const selectedChat = mockChatRooms.find(chat => chat.id === selectedChatId)
    const messages = selectedChatId ? (mockMessages[selectedChatId] || []) : []

    // 필터링된 채팅방 목록
    const filteredChatRooms = mockChatRooms.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // 첫 번째 채팅방 자동 선택
    useEffect(() => {
        if (filteredChatRooms.length > 0 && !selectedChatId) {
            setSelectedChatId(filteredChatRooms[0].id)
        }
    }, [filteredChatRooms, selectedChatId])

    // 메시지가 변경될 때 스크롤을 맨 아래로
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleChatClick = (chatId: string) => {
        setSelectedChatId(chatId)
    }

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // 실제 구현 시 여기서 메시지 전송 API 호출
            console.log('메시지 전송:', newMessage)
            setNewMessage('')
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const formatTime = (timeString: string) => {
        return timeString
    }

    return (
        <div className="flex gap-8 h-[calc(100vh-200px)] p-2">
            {/* 왼쪽: 채팅방 리스트 */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">채팅</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">
                                총 {filteredChatRooms.length}개
                            </span>
                            <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
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
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                            <div
                                key={chat.id}
                                onClick={() => handleChatClick(chat.id)}
                                className={`p-5 mx-2 mb-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${selectedChatId === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-500 shadow-sm' : 'hover:shadow-sm'
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
                        ))
                    )}
                </div>
            </div>

            {/* 오른쪽: 채팅 내용 */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                {selectedChat ? (
                    <>
                        {/* 채팅방 헤더 */}
                        <div className="p-6 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-gray-500" />
                                        </div>
                                        {selectedChat.isOnline && (
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {selectedChat.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {selectedChat.isOnline ? '온라인' : '오프라인'}
                                            {selectedChat.participants.length > 1 &&
                                                ` • ${selectedChat.participants.length}명`
                                            }
                                        </p>
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

                        {/* 메시지 목록 */}
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

                        {/* 메시지 입력 */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-end gap-4">
                                <div className="flex-1">
                                    <textarea
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="메시지를 입력하세요..."
                                        rows={1}
                                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{ minHeight: '48px', maxHeight: '120px' }}
                                    />
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    className={`p-3 rounded-lg transition-colors ${newMessage.trim()
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-8 h-8 text-gray-400" />
                            </div>
                            <p>채팅방을 선택해주세요</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatPage