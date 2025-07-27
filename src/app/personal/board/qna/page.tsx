// src\app\personal\board\qna\page.tsx
'use client'

import React, { useState } from 'react'
import {
    Calendar,
    User,
    MessageCircle,
    CheckCircle2,
    Circle,
    Clock,
    AlertCircle,
    Phone,
    Headphones,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
    Zap
} from 'lucide-react'

interface Answer {
    id: number
    author: string
    role: '관리자' | '시니어상담사' | '개발팀'
    date: string
    content: string
    isAccepted?: boolean
}

interface Question {
    id: number
    title: string
    author: string
    team: string
    date: string
    views: number
    content: string
    category: '시스템질문' | '고객응대' | '실적관리' | '기능요청' | '오류신고'
    priority: 'high' | 'medium' | 'low'
    status: 'solved' | 'unsolved' | 'in-progress'
    answers: Answer[]
    tags: string[]
}

// 샘플 데이터 - 상담사 관련 질문들
const allQuestions: Question[] = [
    {
        id: 1,
        title: '통화 중 고객정보 팝업이 자동으로 안 뜨는 문제',
        author: '김상담',
        team: '인바운드1팀',
        date: '2024-01-15',
        views: 234,
        category: '오류신고',
        priority: 'high',
        status: 'solved',
        tags: ['CTI', '팝업', '고객정보'],
        content: '안녕하세요.\n\n인바운드 전화 수신 시 고객정보 팝업이 자동으로 뜨지 않아 수동으로 검색해야 합니다.\n\n증상:\n- CTI는 정상 작동 (전화번호 표시됨)\n- 팝업 설정은 "자동팝업 사용"으로 되어있음\n- 다른 팀원들은 정상 작동\n\n재부팅해도 해결되지 않습니다. 확인 부탁드립니다.',
        answers: [
            {
                id: 1,
                author: '시스템관리자',
                role: '관리자',
                date: '2024-01-15',
                content: '확인 결과 해당 상담사님 PC의 팝업차단 설정 문제였습니다.\n\n해결방법:\n1. 크롬 설정 > 개인정보 및 보안 > 사이트 설정\n2. 팝업 및 리디렉션에서 상담 시스템 URL 허용\n3. CTI 프로그램 재시작\n\n위 방법으로 해결되었습니다. 동일 증상 발생 시 참고하세요.',
                isAccepted: true
            }
        ]
    },
    {
        id: 2,
        title: '난이도 높은 고객 응대 시 대처 방법 공유 요청',
        author: '박상담',
        team: '아웃바운드2팀',
        date: '2024-01-14',
        views: 456,
        category: '고객응대',
        priority: 'medium',
        status: 'in-progress',
        tags: ['고객응대', '스킬', '노하우'],
        content: '최근 감정적으로 격앙된 고객님들이 많이 증가했습니다.\n\n특히 다음과 같은 상황에서 어려움을 겪고 있습니다:\n- 욕설이나 인신공격을 하는 경우\n- 무리한 요구를 반복하는 경우\n- 상담사 개인을 지목하여 책임을 묻는 경우\n\n선배님들의 노하우나 대처 방법을 공유해주시면 감사하겠습니다.',
        answers: [
            {
                id: 1,
                author: '이시니어',
                role: '시니어상담사',
                date: '2024-01-14',
                content: '10년차 상담사입니다. 제 경험을 공유드립니다.\n\n1. 감정 분리하기\n- "고객님의 상황이 답답하신 것 이해합니다"\n- 고객의 감정은 인정하되, 개인적으로 받아들이지 않기\n\n2. 구체적인 해결책 제시\n- 할 수 있는 것과 없는 것을 명확히 구분\n- 대안 제시: "~는 어렵지만, ~는 가능합니다"\n\n3. 상담 종료 시점 판단\n- 욕설 3회 이상 시 정중히 종료 고지\n- "더 나은 상담을 위해 잠시 후 연락드리겠습니다"',
                isAccepted: false
            },
            {
                id: 2,
                author: '최관리자',
                role: '관리자',
                date: '2024-01-15',
                content: '좋은 질문입니다. 공식 가이드라인을 안내드립니다.\n\n1. 녹취 고지 후 상담 진행\n2. 정해진 경고 멘트 사용 (매뉴얼 참조)\n3. 상황 발생 시 팀장 즉시 보고\n4. 상담 일지에 상세 기록 필수\n\n추가로 이번 주 금요일에 "어려운 고객 응대 스킬" 교육이 있으니 신청하세요.',
                isAccepted: false
            }
        ]
    },
    {
        id: 3,
        title: '실적 집계 시간이 실제와 다르게 나옵니다',
        author: '정상담',
        team: '인바운드3팀',
        date: '2024-01-13',
        views: 189,
        category: '실적관리',
        priority: 'high',
        status: 'unsolved',
        tags: ['실적', '통계', '오류'],
        content: '오늘 확인해보니 실제 통화 시간과 시스템에 집계된 시간이 다릅니다.\n\n예시:\n- 실제 통화: 오전 9시~12시 (3시간)\n- 시스템 집계: 2시간 30분\n\n이런 차이가 계속 발생하면 평가에 불이익이 있을 것 같아 문의드립니다.',
        answers: []
    },
    {
        id: 4,
        title: '상담 중 실시간 매뉴얼 검색 기능 추가 요청',
        author: '강상담',
        team: '테크지원팀',
        date: '2024-01-12',
        views: 567,
        category: '기능요청',
        priority: 'medium',
        status: 'in-progress',
        tags: ['기능개선', '매뉴얼', 'UI'],
        content: '상담 중에 매뉴얼을 빠르게 검색할 수 있는 기능이 있으면 좋겠습니다.\n\n현재는:\n1. 별도 창에서 매뉴얼 열기\n2. Ctrl+F로 검색\n3. 다시 상담 화면으로 전환\n\n제안:\n- 상담 화면 우측에 검색창 추가\n- 키워드 입력 시 실시간 결과 표시\n- 자주 찾는 내용 즐겨찾기 기능',
        answers: [
            {
                id: 1,
                author: '개발팀',
                role: '개발팀',
                date: '2024-01-13',
                content: '좋은 제안 감사합니다!\n\n현재 개발팀에서 검토 중이며, 2024년 2월 업데이트에 포함될 예정입니다.\n\n추가 기능:\n- 음성 검색 지원\n- 최근 검색 히스토리\n- 팀별 커스텀 매뉴얼 등록\n\n베타 테스트 참여를 원하시면 별도 신청 부탁드립니다.',
                isAccepted: false
            }
        ]
    },
    {
        id: 5,
        title: '이번 달 인센티브 계산 기준이 변경되었나요?',
        author: '임상담',
        team: '아웃바운드1팀',
        date: '2024-01-11',
        views: 892,
        category: '실적관리',
        priority: 'medium',
        status: 'solved',
        tags: ['인센티브', '실적', '급여'],
        content: '이번 달 예상 인센티브를 계산해보니 평소보다 적게 나옵니다.\n\n제 실적:\n- 일평균 통화: 85건 (목표 80건)\n- 평균 통화시간: 4분 20초\n- 목표달성률: 106%\n\n그런데 예상 인센티브가 지난달보다 적습니다. 계산 기준이 바뀐건가요?',
        answers: [
            {
                id: 1,
                author: '인사팀',
                role: '관리자',
                date: '2024-01-11',
                content: '확인해드립니다.\n\n1월부터 인센티브 계산 방식이 일부 변경되었습니다:\n- 기본 통화 건수 가중치: 40% → 35%\n- 상담 품질 점수 가중치: 30% → 35%\n- 고객만족도 가중치: 30% → 30% (유지)\n\n전체 공지사항을 확인하지 못하신 것 같아 다시 안내드립니다.\n자세한 내용은 인사팀 공지사항을 참고해주세요.',
                isAccepted: true
            }
        ]
    },
    {
        id: 6,
        title: 'VoC 음성 파일 다운로드가 안 됩니다',
        author: '조상담',
        team: '품질관리팀',
        date: '2024-01-10',
        views: 234,
        category: '시스템질문',
        priority: 'low',
        status: 'solved',
        tags: ['VoC', '음성파일', '다운로드'],
        content: '고객 불만 VoC 처리를 위해 음성 파일을 다운로드하려는데 계속 실패합니다.\n\n"파일을 찾을 수 없습니다" 오류가 뜹니다.',
        answers: [
            {
                id: 1,
                author: 'IT지원팀',
                role: '관리자',
                date: '2024-01-10',
                content: '음성 파일 서버 이전 작업으로 인한 일시적 오류였습니다.\n\n현재는 정상화되었으며, 기존 링크들도 모두 업데이트했습니다.\n불편을 드려 죄송합니다.',
                isAccepted: true
            }
        ]
    },
    {
        id: 7,
        title: '신규 상담사 교육 자료 요청드립니다',
        author: '한교육',
        team: '교육팀',
        date: '2024-01-09',
        views: 445,
        category: '시스템질문',
        priority: 'medium',
        status: 'solved',
        tags: ['교육', '신입', '자료'],
        content: '다음 주 신규 상담사 입사 예정인데, 최신 교육 자료를 요청드립니다.\n\n필요한 자료:\n- 시스템 사용 매뉴얼\n- 주요 상품 설명서\n- 응대 화법 가이드\n- 실습용 시나리오',
        answers: [
            {
                id: 1,
                author: '교육지원팀',
                role: '관리자',
                date: '2024-01-09',
                content: '교육 자료 공유드립니다.\n\n📁 구글 드라이브 링크: [2024년 신입 상담사 교육자료]\n\n포함 내용:\n- 기본 교육 PPT (5일차 과정)\n- 동영상 자료 10편\n- 평가 문제은행\n- 우수 상담 사례집\n\n추가 필요하신 자료 있으면 요청해주세요.',
                isAccepted: true
            }
        ]
    },
    {
        id: 8,
        title: '원격 근무 시 VPN 연결이 자주 끊깁니다',
        author: '윤상담',
        team: '재택근무팀',
        date: '2024-01-08',
        views: 678,
        category: '오류신고',
        priority: 'high',
        status: 'in-progress',
        tags: ['VPN', '재택근무', '연결오류'],
        content: '재택근무 중 VPN 연결이 30분마다 끊겨서 업무에 지장이 있습니다.\n\n환경:\n- 인터넷: KT 기가인터넷\n- VPN 클라이언트: 최신 버전\n- 발생 시간: 주로 오전 9-11시\n\n다른 재택 상담사분들도 비슷한 문제를 겪고 계신가요?',
        answers: [
            {
                id: 1,
                author: '네트워크팀',
                role: '관리자',
                date: '2024-01-08',
                content: '현재 VPN 서버 증설 작업 중입니다.\n\n임시 해결책:\n1. VPN 클라이언트에서 프로토콜을 UDP → TCP로 변경\n2. MTU 값을 1400으로 조정\n3. 대체 서버 (VPN2.company.com) 사용\n\n1월 20일까지 서버 증설 완료 예정입니다.',
                isAccepted: false
            }
        ]
    }
]

// 상태별 설정
const statusConfig = {
    solved: {
        icon: CheckCircle2,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        label: '해결됨'
    },
    unsolved: {
        icon: Circle,
        color: 'text-gray-400',
        bgColor: 'bg-gray-50',
        label: '미해결'
    },
    'in-progress': {
        icon: Clock,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        label: '진행중'
    }
}

// 카테고리별 색상 및 아이콘
const categoryConfig: Record<string, { color: string; icon: any }> = {
    '시스템질문': { color: 'bg-blue-100 text-blue-700', icon: MessageSquare },
    '고객응대': { color: 'bg-purple-100 text-purple-700', icon: Headphones },
    '실적관리': { color: 'bg-green-100 text-green-700', icon: AlertCircle },
    '기능요청': { color: 'bg-orange-100 text-orange-700', icon: Zap },
    '오류신고': { color: 'bg-red-100 text-red-700', icon: AlertTriangle }
}

// 우선순위 설정
const priorityConfig = {
    high: { label: '긴급', color: 'text-red-600' },
    medium: { label: '보통', color: 'text-yellow-600' },
    low: { label: '낮음', color: 'text-gray-500' }
}

const ITEMS_PER_PAGE = 5

const QnAPage = () => {
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(allQuestions[0])
    const [filter, setFilter] = useState<'all' | 'solved' | 'unsolved' | 'in-progress'>('all')
    const [currentPage, setCurrentPage] = useState(1)

    const filteredQuestions = filter === 'all'
        ? allQuestions
        : allQuestions.filter(q => q.status === filter)

    const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentQuestions = filteredQuestions.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        if (currentQuestions.length > 0) {
            setSelectedQuestion(currentQuestions[0])
        }
    }

    return (
        <div className="flex gap-6 h-[calc(100vh-200px)]">
            {/* 왼쪽: 질문 리스트 */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">상담사 Q&A</h2>

                    {/* 필터 버튼 */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setFilter('all'); setCurrentPage(1); }}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${filter === 'all'
                                    ? 'bg-gray-800 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            전체 ({allQuestions.length})
                        </button>
                        <button
                            onClick={() => { setFilter('solved'); setCurrentPage(1); }}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${filter === 'solved'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            해결됨
                        </button>
                        <button
                            onClick={() => { setFilter('unsolved'); setCurrentPage(1); }}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${filter === 'unsolved'
                                    ? 'bg-gray-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            미해결
                        </button>
                        <button
                            onClick={() => { setFilter('in-progress'); setCurrentPage(1); }}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${filter === 'in-progress'
                                    ? 'bg-yellow-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            진행중
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {currentQuestions.map((question) => {
                        const StatusIcon = statusConfig[question.status].icon
                        const CategoryIcon = categoryConfig[question.category].icon
                        return (
                            <div
                                key={question.id}
                                onClick={() => setSelectedQuestion(question)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${selectedQuestion?.id === question.id ? 'bg-blue-50' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-3 mb-2">
                                    <StatusIcon className={`w-5 h-5 mt-0.5 ${statusConfig[question.status].color}`} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            {question.priority === 'high' && (
                                                <span className="text-xs font-medium text-red-600">
                                                    [긴급]
                                                </span>
                                            )}
                                            <h3 className="font-medium text-gray-800">
                                                {question.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded ${categoryConfig[question.category].color}`}>
                                                <CategoryIcon className="w-3 h-3" />
                                                {question.category}
                                            </span>
                                            {question.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-xs text-gray-500">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {question.author} ({question.team})
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {question.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MessageCircle className="w-3 h-3" />
                                                {question.answers.length}개 답변
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* 페이지네이션 */}
                <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${currentPage === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        이전
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 text-sm rounded ${currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${currentPage === totalPages
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        다음
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* 오른쪽: 상세 내용 */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {selectedQuestion ? (
                    <div className="flex flex-col h-full">
                        {/* 질문 헤더 */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-start gap-3 mb-3">
                                {(() => {
                                    const StatusIcon = statusConfig[selectedQuestion.status].icon
                                    return (
                                        <StatusIcon className={`w-6 h-6 ${statusConfig[selectedQuestion.status].color}`} />
                                    )
                                })()}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        {selectedQuestion.priority === 'high' && (
                                            <span className="text-sm font-medium text-red-600">
                                                [긴급]
                                            </span>
                                        )}
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {selectedQuestion.title}
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded ${categoryConfig[selectedQuestion.category].color}`}>
                                            {(() => {
                                                const CategoryIcon = categoryConfig[selectedQuestion.category].icon
                                                return <CategoryIcon className="w-3 h-3" />
                                            })()}
                                            {selectedQuestion.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {selectedQuestion.author} ({selectedQuestion.team})
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {selectedQuestion.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 질문 내용 + 답변들 */}
                        <div className="flex-1 overflow-y-auto">
                            {/* 질문 내용 */}
                            <div className="p-6 border-b border-gray-100">
                                <pre className="whitespace-pre-wrap font-sans text-gray-700">
                                    {selectedQuestion.content}
                                </pre>
                                <div className="flex gap-2 mt-3">
                                    {selectedQuestion.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 답변 섹션 */}
                            <div className="p-6">
                                <h3 className="font-semibold text-gray-800 mb-4">
                                    {selectedQuestion.answers.length}개의 답변
                                </h3>

                                {selectedQuestion.answers.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400">
                                        <AlertCircle className="w-12 h-12 mx-auto mb-2" />
                                        <p>아직 답변이 없습니다</p>
                                        <p className="text-sm mt-1">첫 번째 답변을 작성해보세요!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {selectedQuestion.answers.map(answer => (
                                            <div
                                                key={answer.id}
                                                className={`p-4 rounded-lg border ${answer.isAccepted
                                                        ? 'border-green-200 bg-green-50'
                                                        : 'border-gray-200 bg-gray-50'
                                                    }`}
                                            >
                                                {answer.isAccepted && (
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                        <span className="text-sm font-medium text-green-600">
                                                            채택된 답변
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-3 mb-2 text-sm">
                                                    <span className="font-medium text-gray-800">{answer.author}</span>
                                                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                                                        {answer.role}
                                                    </span>
                                                    <span className="text-gray-500">{answer.date}</span>
                                                </div>
                                                <pre className="whitespace-pre-wrap font-sans text-gray-700">
                                                    {answer.content}
                                                </pre>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                            <MessageSquare className="w-12 h-12 mx-auto mb-2" />
                            <p>질문을 선택해주세요</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default QnAPage