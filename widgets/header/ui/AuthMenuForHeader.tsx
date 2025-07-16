'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useApiForLogin } from '@/features/auth/hooks/useApiForLogin';

export default function AuthMenuForHeader() {
    const { user, isAuthenticated, setAuth, logout } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const mutation = useApiForLogin();
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    setAuth(data.user, data.token);
                    toast.success('🎉 로그인 성공!');
                    setEmail('');
                    setPassword('');
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.error ?? '로그인 실패!');
                },
            }
        );
    };

    const handleLogout = () => {
        logout();
        toast.success('로그아웃되었습니다');
        router.push('/');
        setIsOpen(false);
    };

    // 로그인된 상태: 사용자 메뉴
    if (isAuthenticated && user) {
        return (
            <div className="relative">
                {/* 사용자 정보 버튼 */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                            {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-gray-900">{user.name || '사용자'}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* 드롭다운 메뉴 */}
                {isOpen && (
                    <>
                        {/* 오버레이 */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* 메뉴 */}
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-20">
                            <div className="py-2">
                                {/* 사용자 정보 */}
                                <div className="px-4 py-3 border-b">
                                    <p className="text-sm font-medium text-gray-900">{user.name || '사용자'}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>

                                {/* 메뉴 아이템들 */}
                                <div className="py-1">
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        프로필 설정
                                    </button>

                                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        설정
                                    </button>

                                    <div className="border-t my-1"></div>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        로그아웃
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    // 로그인 안한 상태: 로그인 폼
    return (
        <>
            {/* 데스크톱 로그인 폼 */}
            <form onSubmit={handleLogin} className="hidden md:flex items-center space-x-3">
                <Input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-40 h-9 text-sm"
                />
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-32 h-9 text-sm"
                />
                <Button
                    type="submit"
                    disabled={mutation.isPending}
                    size="sm"
                    className="h-9"
                >
                    {mutation.isPending ? '로그인...' : '로그인'}
                </Button>
                <Link href="/signup">
                    <Button variant="outline" size="sm" className="h-9">
                        회원가입
                    </Button>
                </Link>
            </form>

            {/* 모바일 로그인 폼 (헤더에서 별도 처리) */}
            <div className="md:hidden flex items-center space-x-2">
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
        </>
    );
}