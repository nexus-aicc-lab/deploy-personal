'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import AuthMenuForHeader from './ui/AuthMenuForHeader';
import HeaderTransitionBar from '@/shared/ui/HeaderTransitionBar';

export default function Header() {
    const [isBoardOpen, setIsBoardOpen] = useState(false);
    const [isUtilOpen, setIsUtilOpen] = useState(false);
    const boardDropdownRef = useRef<HTMLDivElement>(null);
    const utilDropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (boardDropdownRef.current && !boardDropdownRef.current.contains(event.target as Node)) {
                setIsBoardOpen(false);
            }
            if (utilDropdownRef.current && !utilDropdownRef.current.contains(event.target as Node)) {
                setIsUtilOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="relative bg-white shadow-sm border-b">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center min-h-[48px]">
                    {/* 👑 타이틀 */}
                    <Link
                        href="/"
                        className="text-xl font-bold text-emerald-600 hover:underline whitespace-nowrap"
                    >
                        UCTI Personal
                    </Link>

                    {/* 🧭 중앙 메뉴 - 완벽한 수직 정렬을 위한 개선 */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 h-12">
                        <Link
                            href="/personal/login2"
                            className="hover:text-emerald-600 transition-colors h-12 flex items-center justify-center px-2 leading-none"
                        >
                            Login
                        </Link>
                        <Link
                            href="/personal/manual"
                            className="hover:text-emerald-600 transition-colors h-12 flex items-center justify-center px-2 leading-none"
                        >
                            manual
                        </Link>

                        {/* 게시판 드롭다운 */}
                        <div className="relative h-12 flex items-center" ref={boardDropdownRef}>
                            <button
                                onClick={() => setIsBoardOpen(!isBoardOpen)}
                                className="flex items-center justify-center gap-1 hover:text-emerald-600 transition-colors h-12 px-2 text-sm font-medium leading-none"
                            >
                                Board
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${isBoardOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* 드롭다운 메뉴 */}
                            {isBoardOpen && (
                                <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                    <Link
                                        href="/personal/board/notice"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        onClick={() => setIsBoardOpen(false)}
                                    >
                                        공지
                                    </Link>
                                    <Link
                                        href="/personal/board/qna"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        onClick={() => setIsBoardOpen(false)}
                                    >
                                        질문 답변
                                    </Link>
                                    <Link
                                        href="/personal/board/suggestion"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        onClick={() => setIsBoardOpen(false)}
                                    >
                                        제안
                                    </Link>
                                    <Link
                                        href="/personal/board/free"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        onClick={() => setIsBoardOpen(false)}
                                    >
                                        자유
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Util 드롭다운 */}
                        <div className="relative h-12 flex items-center" ref={utilDropdownRef}>
                            <button
                                onClick={() => setIsUtilOpen(!isUtilOpen)}
                                className="flex items-center justify-center gap-1 hover:text-emerald-600 transition-colors h-12 px-2 text-sm font-medium leading-none"
                            >
                                Util
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${isUtilOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Util 드롭다운 메뉴 */}
                            {isUtilOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                    <Link
                                        href="/personal/util/memo"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        onClick={() => setIsUtilOpen(false)}
                                    >
                                        개인 메모장
                                    </Link>
                                    <Link
                                        href="/personal/util/files"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        onClick={() => setIsUtilOpen(false)}
                                    >
                                        파일함
                                    </Link>
                                    <Link
                                        href="/personal/util/calendar"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        onClick={() => setIsUtilOpen(false)}
                                    >
                                        근무 일정 캘린더
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/personal/reporting"
                            className="hover:text-emerald-600 transition-colors h-12 flex items-center justify-center px-2 leading-none"
                        >
                            Report Tool
                        </Link>
                        <Link
                            href="/personal/chat"
                            className="hover:text-emerald-600 transition-colors h-12 flex items-center justify-center px-2 leading-none"
                        >
                            채팅
                        </Link>
                        <Link
                            href="/personal/report-bug"
                            className="hover:text-emerald-600 transition-colors h-12 flex items-center justify-center px-2 leading-none"
                        >
                            오류 신고
                        </Link>
                    </nav>

                    {/* 🔐 인증 메뉴 */}
                    <div className="flex items-center">
                        <AuthMenuForHeader />
                    </div>
                </div>
            </div>

            {/* ✅ 하단 트랜지션 바 */}
            <HeaderTransitionBar />
        </header>
    );
}