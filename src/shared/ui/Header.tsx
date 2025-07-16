'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/features/auth/store/authStore';

export default function Header() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        toast.success('로그아웃되었습니다');
        router.push('/');
    };

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

                    {/* 사용자 정보 / 로그인 버튼 */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated && user ? (
                            <div className="flex items-center space-x-4">
                                {/* 사용자 정보 */}
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-blue-600">
                                            {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-sm font-medium text-gray-900">{user.name || '사용자'}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>

                                {/* 드롭다운 메뉴 대신 간단한 로그아웃 버튼 */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="text-sm"
                                >
                                    로그아웃
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link href="/login">
                                    <Button variant="outline" size="sm">
                                        로그인
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button size="sm">
                                        회원가입
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* 모바일 메뉴 (간단 버전) */}
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