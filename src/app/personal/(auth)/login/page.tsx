'use client';

import React from 'react';
import Image from 'next/image';
import './styles.css';
import LoginForm from '@/features/auth/ui/LoginForm';

const LoginPage: React.FC = () => {
    // 로그인 성공 시 처리
    const handleLoginSuccess = (token: string, username: string) => {
        console.log('✅ 로그인 성공:', { token, username });
        // 추가적인 성공 처리 로직을 여기에 구현
        // 예: 상태 업데이트, 리다이렉션 등
    };

    // 로그인 에러 시 처리
    const handleLoginError = (error: string) => {
        console.error('❌ 로그인 에러:', error);
        // 추가적인 에러 처리 로직을 여기에 구현
        // 예: 에러 로깅, 알림 표시 등
    };

    return (
        <div id="login-wrap" className="log-bg">
            <div className="login-box_wrap">
                <div className="dki-login-wrap">
                    <div className="login-box">
                        <div className="lg-header">
                            {/* basePath가 설정된 경우 */}
                            <Image
                                src="/login/admin.png"
                                alt="Login"
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
                        <LoginForm
                            onLoginSuccess={handleLoginSuccess}
                            onLoginError={handleLoginError}
                        />
                    </div>
                </div>
                <div className="lg-footer">
                    <p title="v1.0.0" id="version2">v1.0.0</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;