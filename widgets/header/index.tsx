'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import AuthMenuForHeader from './ui/AuthMenuForHeader';
import HeaderTransitionBar from '@/shared/ui/HeaderTransitionBar';

export default function Header() {
    const [isBoardOpen, setIsBoardOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsBoardOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="relative bg-white shadow-sm border-b">
            <div className="container mx-auto px-6 py-1">
                <div className="flex justify-between items-center">
                    {/* 👑 타이틀 */}
                    <Link
                        href="/"
                        className="text-xl font-bold text-emerald-600 hover:underline whitespace-nowrap"
                    >
                        UCTI Personal
                    </Link>

                    {/* 🧭 중앙 메뉴 */}
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                        <Link href="/personal/login" className="hover:text-emerald-600 transition-colors">
                            Login
                        </Link>
                        <Link href="/personal/manual" className="hover:text-emerald-600 transition-colors">
                            manual
                        </Link>

                        {/* 게시판 드롭다운 */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsBoardOpen(!isBoardOpen)}
                                className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
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

                        <Link href="/settings" className="hover:text-emerald-600 transition-colors">
                            setting
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