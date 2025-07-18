'use client';

import { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useApiForSignup } from '@/features/auth/hooks/useApiForSignup';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios'; // 👍 타입만 import

type SignupErrorResponse = {
    error?: string;
};

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const mutation = useApiForSignup();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(
            { email, password, name },
            {
                onSuccess: () => {
                    toast.success('🎉 회원가입 성공!');
                },
                onError: (error: AxiosError<SignupErrorResponse>) => {
                    toast.error(error.response?.data?.error ?? '에러 발생!');
                },
            }
        );
    };

    return (
        <div className="max-w-md mx-auto py-12">
            <h2 className="text-2xl font-bold mb-4">회원가입</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    placeholder="이메일"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? '가입 중...' : '회원가입'}
                </Button>
            </form>
        </div>
    );
}
