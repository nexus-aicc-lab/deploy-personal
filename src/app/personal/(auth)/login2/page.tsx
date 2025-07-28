'use client';

import React, { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useApiForLogin } from '@/features/auth/hooks/useApiForLogin';
import { useAuthStore } from '@/features/auth/store/authStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import LoginAbleUsersTable from './ui/LoginAbleUsersTable';

export default function LoginPage2() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const mutation = useApiForLogin();
    const { setAuth } = useAuthStore();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        mutation.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    const user = {
                        id: data.userId,
                        email: data.email,
                        name: data.name,
                    };
                    setAuth(user, data.token);
                    toast.success('🎉 로그인 성공!');
                    router.push('/personal/dashboard');
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || '로그인 실패!');
                },
            }
        );
    };

    const handleSelectUser = (selectedEmail: string, selectedPassword: string) => {
        setEmail(selectedEmail);
        setPassword(selectedPassword);
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">UCTI 로그인</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending ? '로그인 중...' : '로그인'}
                </Button>
            </form>

            <LoginAbleUsersTable onSelectUser={handleSelectUser} />
        </div>
    );
}
