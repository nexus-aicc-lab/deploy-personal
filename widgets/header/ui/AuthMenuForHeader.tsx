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
    const mutationForLogin = useApiForLogin();
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        mutationForLogin.mutate(
            { email, password },
            {
                onSuccess: async (data) => {
                    const user = {
                        id: data.userId,
                        email: data.email,
                        name: data.name
                    };
                    await setAuth(user, data.token);
                    toast.success('로그인 성공');
                    setEmail('');
                    setPassword('');
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || '로그인 실패');
                },
            }
        );
    };

    const handleLogout = () => {
        router.push('/personal/login2');
        setTimeout(() => {
            logout();
            toast.success('로그아웃되었습니다');
        }, 100);
        setIsOpen(false);
    };

    // 로그인된 상태
    if (isAuthenticated && user) {
        return (
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2.5 px-2 py-1 hover:bg-gray-50 transition-colors"
                >
                    <div className="w-7 h-7 bg-gray-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                    </div>
                    <span className="text-sm text-gray-700">{user.name || user.email}</span>
                    <svg
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform ml-1 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        <div className="absolute right-0 mt-1 w-52 bg-white shadow-md border border-gray-200 z-50">
                            <div className="py-1">
                                <div className="px-3 py-2.5 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>

                                <Link href="/personal/profile" onClick={() => setIsOpen(false)}>
                                    <div className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                                        <svg className="w-3.5 h-3.5 mr-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        프로필 설정
                                    </div>
                                </Link>

                                <Link href="/personal/settings" onClick={() => setIsOpen(false)}>
                                    <div className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                                        <svg className="w-3.5 h-3.5 mr-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        </svg>
                                        설정
                                    </div>
                                </Link>

                                <div className="border-t border-gray-100"></div>

                                <div
                                    onClick={handleLogout}
                                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                                >
                                    <svg className="w-3.5 h-3.5 mr-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    로그아웃
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    // 로그인 안한 상태
    return (
        <form onSubmit={handleLogin} className="flex items-center gap-2">
            <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-8 w-36 text-sm rounded-sm"
            />
            <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-8 w-28 text-sm rounded-sm"
            />
            <Button
                type="submit"
                disabled={mutationForLogin.isPending}
                size="sm"
                className="h-8 text-sm rounded-sm"
            >
                {mutationForLogin.isPending ? '...' : '로그인'}
            </Button>
            <Link href="/personal/signup">
                <Button variant="outline" size="sm" className="h-8 text-sm rounded-sm">
                    회원가입
                </Button>
            </Link>
        </form>
    );
}