'use client';

import Link from 'next/link';
import AuthMenuForHeader from './ui/AuthMenuForHeader';
import HeaderTransitionBar from '@/shared/ui/HeaderTransitionBar';

export default function Header() {
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
                        {/* ⚠️ 변경된 부분: href를 '/document'에서 '/login'으로 수정 */}
                        <Link href="/personal/login" className="hover:text-emerald-600 transition-colors">
                            Login
                        </Link>
                        <Link href="/personal/manual" className="hover:text-emerald-600 transition-colors">
                            manual
                        </Link>
                        <Link href="/qa" className="hover:text-emerald-600 transition-colors">
                            Board
                        </Link>
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