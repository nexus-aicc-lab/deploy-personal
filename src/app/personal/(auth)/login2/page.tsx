'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useApiForLogin } from '@/features/auth/hooks/useApiForLogin';
import { useAuthStore } from '@/features/auth/store/authStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import LoginAbleUsersTable from './ui/LoginAbleUsersTable';
import './login2.css';

export default function LoginPage2() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const mutation = useApiForLogin();
    const { setAuth } = useAuthStore();
    const router = useRouter();

    const handleLogin = () => {
        const email = emailRef.current?.value.trim() || '';
        const password = passwordRef.current?.value || '';

        if (!email || !password) {
            setLoginError('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        setLoginError('');

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

                    // 기억하기 기능
                    if (rememberMe) {
                        localStorage.setItem('rememberedEmail', email);
                    } else {
                        localStorage.removeItem('rememberedEmail');
                    }

                    toast.success('🎉 로그인 성공!');

                    // Zustand 상태가 완전히 업데이트될 때까지 대기
                    setTimeout(() => {
                        // returnUrl이 있으면 해당 경로로, 없으면 대시보드로
                        const searchParams = new URLSearchParams(window.location.search);
                        const returnUrl = searchParams.get('returnUrl');
                        router.push(returnUrl ? decodeURIComponent(returnUrl) : '/personal/dashboard');
                    }, 300); // 충분한 시간 확보
                },
                onError: (error: any) => {
                    setLoginError(error?.response?.data?.message || '로그인 실패!');
                },
            }
        );
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !mutation.isPending) {
            handleLogin();
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSelectUser = (selectedEmail: string, selectedPassword: string) => {
        if (emailRef.current) emailRef.current.value = selectedEmail;
        if (passwordRef.current) passwordRef.current.value = selectedPassword;
        setLoginError(''); // 계정 선택시 에러 메시지 초기화
    };

    // 컴포넌트 마운트시 기억된 이메일 불러오기 및 인증 상태 확인
    React.useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail && emailRef.current) {
            emailRef.current.value = rememberedEmail;
            setRememberMe(true);
        }

        // 이미 로그인된 상태라면 대시보드로 리다이렉트
        const { isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated) {
            router.push('/personal/dashboard');
        }
    }, [router]);

    return (
        <div id="login2-wrap" className="log-bg2">
            <div className="login2-container">
                {/* 로그인 박스 */}
                <div className="login2-box">
                    <div className="lg2-header">
                        <Image
                            src="/login/admin.png"
                            alt="UCTI Login"
                            width={100}
                            height={100}
                            priority
                            unoptimized
                            style={{
                                maxWidth: '100%',
                                height: 'auto'
                            }}
                        />
                    </div>
                    <div className="lg2-content">
                        <div className="info-write2">
                            <div className="email-wrap2">
                                <input
                                    ref={emailRef}
                                    className="in-txt2 email2"
                                    id="email2"
                                    maxLength={64}
                                    type="email"
                                    onKeyPress={handleKeyPress}
                                    placeholder="이메일"
                                    disabled={mutation.isPending}
                                    autoComplete="email"
                                />
                            </div>
                            <div className="pwd-wrap2">
                                <input
                                    ref={passwordRef}
                                    className="in-txt2 password2"
                                    id="password2"
                                    maxLength={16}
                                    type={showPassword ? "text" : "password"}
                                    onKeyPress={handleKeyPress}
                                    placeholder="비밀번호"
                                    disabled={mutation.isPending}
                                    autoComplete="current-password"
                                />
                                <span
                                    className={`ic-eye2 ${showPassword ? 'view-on' : ''}`}
                                    onClick={togglePasswordVisibility}
                                    title={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                                />
                            </div>
                        </div>
                        <div className="lg-fail-txt2">{loginError}</div>
                        <div className="set-btn2">
                            <div className="typeset2">
                                <div className="right flex gap10 flex-align">
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="id-rmb2"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <label htmlFor="id-rmb2">
                                            <span>기억하기</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="lg-btn2"
                                type="button"
                                id="loginBtn2"
                                onClick={handleLogin}
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? '로그인 중...' : '로그인'}
                            </button>
                        </div>
                        <ul className="login-notice2">
                            <li>※ 이메일과 비밀번호 입력 시 대소문자를 구분합니다.</li>
                        </ul>
                    </div>
                </div>

                {/* 테스트 계정 테이블 - 오른쪽 배치 */}
                <div className="login2-box">
                    <div className="lg2-header">
                        <h3 className="test-account-title">
                            테스트용 로그인 계정 (클릭 시 자동 입력)
                        </h3>
                    </div>
                    <div className="lg2-content">
                        <div className="test-account-table">
                            <LoginAbleUsersTable onSelectUser={handleSelectUser} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg-footer2">
                <p title="v1.0.0">v1.0.0</p>
            </div>
        </div>
    );
}