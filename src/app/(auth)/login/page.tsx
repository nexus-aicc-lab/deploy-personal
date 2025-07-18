'use client';

import { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useApiForLogin } from '@/features/auth/hooks/useApiForLogin';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { AxiosError } from 'axios'; // 추가해줘!

type LoginErrorResponse = {
    error: string;
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const mutation = useApiForLogin();
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    // Zustand store에 사용자 정보와 토큰 저장
                    setAuth(data.user, data.token);
                    toast.success('🎉 로그인 성공!');
                    router.push('/');
                },
                onError: (err: AxiosError<LoginErrorResponse>) => {
                    toast.error(err.response?.data?.error ?? '로그인 실패!');
                },
            }
        );
    };

    return (
        <div className="max-w-md mx-auto py-12">
            <h2 className="text-2xl font-bold mb-4">로그인</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <Input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" disabled={mutation.isPending} className="w-full">
                    {mutation.isPending ? '로그인 중...' : '로그인'}
                </Button>
            </form>
        </div>
    );
}