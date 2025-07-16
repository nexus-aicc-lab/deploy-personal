// C:\deploy-server\deploy-personal\widgets\header\index.tsx
'use client';

import Link from 'next/link';
import AuthMenuForHeader from './ui/AuthMenuForHeader';

export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* 로고 */}
                    <Link href="/" className="text-xl font-bold text-blue-600">
                        Deploy Personal
                    </Link>

                    {/* 네비게이션 */}
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                            홈
                        </Link>
                        <Link href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">
                            문서
                        </Link>
                        <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                            요금제
                        </Link>
                    </nav>

                    {/* 인증 메뉴 (로그인 폼 또는 사용자 메뉴) */}
                    <div className="flex items-center">
                        <AuthMenuForHeader />
                    </div>
                </div>

                {/* 모바일 메뉴 */}
                <div className="md:hidden mt-4 pt-4 border-t">
                    <nav className="flex space-x-4">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                            홈
                        </Link>
                        <Link href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                            문서
                        </Link>
                        <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                            요금제
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}