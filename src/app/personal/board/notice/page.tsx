// src\app\personal\board\notice\page.tsx
'use client'

import React, { useState } from 'react'
import { Calendar, User, Eye, ChevronRight } from 'lucide-react'

interface Notice {
    id: number
    title: string
    author: string
    date: string
    views: number
    content: string
    important?: boolean
}

// 샘플 데이터
const sampleNotices: Notice[] = [
    {
        id: 1,
        title: '[중요] 시스템 정기 점검 안내',
        author: '관리자',
        date: '2024-01-15',
        views: 234,
        content: '안녕하세요. UCTI Personal 관리자입니다.\n\n다음과 같이 시스템 정기 점검을 실시할 예정이오니 참고 부탁드립니다.\n\n■ 점검 일시: 2024년 1월 20일(토) 02:00 ~ 06:00 (4시간)\n■ 점검 내용: 서버 보안 패치 및 데이터베이스 최적화\n■ 영향: 점검 시간 동안 서비스 이용 불가\n\n점검 시간 동안 불편을 드려 죄송합니다.\n보다 나은 서비스를 위해 최선을 다하겠습니다.\n\n감사합니다.',
        important: true
    },
    {
        id: 2,
        title: '새로운 기능 업데이트 안내',
        author: '개발팀',
        date: '2024-01-14',
        views: 156,
        content: '이번 업데이트에서 추가된 주요 기능을 안내드립니다.\n\n1. 다크모드 지원\n2. 실시간 알림 기능\n3. 파일 드래그앤드롭 업로드\n4. 검색 필터 기능 강화\n\n자세한 사용법은 매뉴얼을 참고해주세요.'
    },
    {
        id: 3,
        title: '2024년 1월 정기 회의 일정',
        author: '운영팀',
        date: '2024-01-10',
        views: 89,
        content: '2024년 1월 정기 회의 일정을 공유드립니다.\n\n날짜: 2024년 1월 25일(목)\n시간: 오후 2시\n장소: 3층 대회의실\n\n참석 대상: 전 직원'
    },
    {
        id: 4,
        title: '보안 정책 변경 사항',
        author: '보안팀',
        date: '2024-01-08',
        views: 201,
        content: '보안 강화를 위해 다음과 같이 정책이 변경됩니다.\n\n- 비밀번호 변경 주기: 90일\n- 2단계 인증 의무화\n- VPN 사용 권장\n\n시행일: 2024년 2월 1일부터'
    },
    {
        id: 5,
        title: '신입 직원 환영합니다',
        author: '인사팀',
        date: '2024-01-05',
        views: 342,
        content: '2024년 상반기 신입 직원을 환영합니다!\n\n입사일: 2024년 1월 15일\n오리엔테이션: 1월 15일 오전 9시\n\n모두 따뜻하게 맞이해주세요.'
    }
]

const NoticePage = () => {
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(sampleNotices[0])

    return (
        <div className="flex gap-6 h-[calc(100vh-200px)]">
            {/* 왼쪽: 공지사항 리스트 */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">공지사항</h2>
                </div>
                <div className="overflow-y-auto h-[calc(100%-60px)]">
                    {sampleNotices.map((notice) => (
                        <div
                            key={notice.id}
                            onClick={() => setSelectedNotice(notice)}
                            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${selectedNotice?.id === notice.id ? 'bg-blue-50' : ''
                                }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-medium text-gray-800 flex-1 pr-2">
                                    {notice.important && (
                                        <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded mr-2">
                                            중요
                                        </span>
                                    )}
                                    {notice.title}
                                </h3>
                                <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5" />
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {notice.author}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {notice.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {notice.views}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 오른쪽: 상세 내용 */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {selectedNotice ? (
                    <>
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                {selectedNotice.important && (
                                    <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-sm rounded mr-2">
                                        중요
                                    </span>
                                )}
                                {selectedNotice.title}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {selectedNotice.author}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {selectedNotice.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    조회수 {selectedNotice.views}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 overflow-y-auto h-[calc(100%-120px)]">
                            <div className="prose prose-sm max-w-none">
                                <pre className="whitespace-pre-wrap font-sans text-gray-700">
                                    {selectedNotice.content}
                                </pre>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <p>공지사항을 선택해주세요</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NoticePage