// src/app/personal/board/notice/page.tsx
'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Calendar, User, Eye, ChevronRight, ChevronLeft, AlertCircle, Loader2, Search } from 'lucide-react'
import { useNoticeList, useNoticeDetail } from '@/features/board/hooks/useNoticeBoard'
import CreateButtonForNoticeBoard from './ui/CreateButtonForNoticeBoard'

const NoticePage = () => {
    const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const limit = 10 // 페이지당 항목 수

    // API 호출
    const { data: listData, isLoading: listLoading, error: listError } = useNoticeList({
        page: currentPage,
        limit,
        search: searchTerm
    })
    const { data: detailData, isLoading: detailLoading } = useNoticeDetail(selectedNoticeId || '')

    // useMemo를 사용하여 notices 메모이제이션
    const notices = useMemo(() => listData?.notices || [], [listData?.notices])
    const pagination = listData?.pagination
    const selectedNotice = detailData?.notice

    // 첫 번째 공지사항 자동 선택
    useEffect(() => {
        if (notices.length > 0 && !selectedNoticeId) {
            setSelectedNoticeId(notices[0].id)
        }
    }, [notices, selectedNoticeId])

    // 공지사항 클릭 핸들러
    const handleNoticeClick = (noticeId: string) => {
        setSelectedNoticeId(noticeId)
    }

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
        setSelectedNoticeId(null) // 페이지 변경 시 선택 초기화
    }

    // 검색 핸들러
    const handleSearch = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1) // 검색 시 첫 페이지로
        setSelectedNoticeId(null)
    }

    // 날짜 포맷팅
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    }

    // 로딩 상태
    if (listLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-500">공지사항을 불러오는 중...</p>
                </div>
            </div>
        )
    }

    // 에러 상태
    if (listError) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                    <p className="text-gray-700 font-medium">공지사항을 불러올 수 없습니다</p>
                    <p className="text-gray-500 text-sm mt-1">잠시 후 다시 시도해주세요</p>
                </div>
            </div>
        )
    }

    // 데이터가 없는 경우
    if (notices.length === 0 && !searchTerm) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-700 font-medium">등록된 공지사항이 없습니다</p>
                    <CreateButtonForNoticeBoard />
                </div>
            </div>
        )
    }

    return (
        <div className="flex gap-6 h-[calc(100vh-200px)]">
            {/* 왼쪽: 공지사항 리스트 */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-gray-800">공지사항</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">
                                총 {pagination?.total || 0}개
                            </span>
                            <CreateButtonForNoticeBoard />
                        </div>
                    </div>

                    {/* 검색바 */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="공지사항 검색..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* 목록 영역 */}
                <div className="flex-1 overflow-y-auto">
                    {notices.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <div className="text-center">
                                <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                <p>&ldquo;{searchTerm}&rdquo; 검색 결과가 없습니다</p>
                            </div>
                        </div>
                    ) : (
                        notices.map((notice) => (
                            <div
                                key={notice.id}
                                onClick={() => handleNoticeClick(notice.id)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${selectedNoticeId === notice.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-medium text-gray-800 flex-1 pr-2">
                                        {notice.isPinned && (
                                            <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded mr-2">
                                                고정
                                            </span>
                                        )}
                                        {notice.isImportant && (
                                            <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded mr-2">
                                                중요
                                            </span>
                                        )}
                                        {notice.title}
                                    </h3>
                                    <ChevronRight className={`w-4 h-4 text-gray-400 mt-0.5 transition-transform ${selectedNoticeId === notice.id ? 'rotate-90' : ''
                                        }`} />
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {notice.authorName}
                                        {notice.authorDepartment && (
                                            <span className="text-gray-400">({notice.authorDepartment})</span>
                                        )}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(notice.createdAt)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {notice.viewCount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* 페이지네이션 */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-colors ${currentPage === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <ChevronLeft className="w-3 h-3" />
                            이전
                        </button>

                        <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-600 mr-2">
                                {currentPage} / {pagination.totalPages} 페이지
                            </span>

                            {/* 페이지 번호 버튼들 */}
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (pagination.totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= pagination.totalPages - 2) {
                                        pageNum = pagination.totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-6 h-6 text-xs rounded-md transition-colors ${currentPage === pageNum
                                                ? 'bg-blue-600 text-white font-medium'
                                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={!pagination.hasMore}
                            className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-colors ${!pagination.hasMore
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            다음
                            <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                )}
            </div>

            {/* 오른쪽: 상세 내용 */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {detailLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                            <p className="text-gray-500">내용을 불러오는 중...</p>
                        </div>
                    </div>
                ) : selectedNotice ? (
                    <>
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                {selectedNotice.isPinned && (
                                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded mr-2">
                                        고정
                                    </span>
                                )}
                                {selectedNotice.isImportant && (
                                    <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-sm rounded mr-2">
                                        중요
                                    </span>
                                )}
                                {selectedNotice.title}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {selectedNotice.authorName}
                                    {selectedNotice.authorDepartment && (
                                        <span className="text-gray-500">({selectedNotice.authorDepartment})</span>
                                    )}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(selectedNotice.createdAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    조회수 {selectedNotice.viewCount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 overflow-y-auto h-[calc(100%-120px)]">
                            <div className="prose prose-sm max-w-none">
                                <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                                    {selectedNotice.content}
                                </pre>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Eye className="w-8 h-8 text-gray-400" />
                            </div>
                            <p>공지사항을 선택해주세요</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NoticePage