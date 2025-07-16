'use client';

import { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useApiForLogin } from '@/features/auth/hooks/useApiForLogin';

export default function LoginPage() {
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
                    toast.success('🎉 로그인 성공!');
                    // 예: 홈으로 이동하거나 대시보드로
                    router.push('/');
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.error ?? '로그인 실패!');
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
                />
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" disabled={mutation.isLoading}>
                    로그인
                </Button>
            </form>
        </div>
    );
}
