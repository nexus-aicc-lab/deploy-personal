// src/features/auth/ui/LoginForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useAuthorize } from '@/features/auth/hooks/useAuthorize';

interface LoginFormProps {
    onLoginSuccess?: (token: string, agentId: string) => void;
    onLoginError?: (error: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onLoginError }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showAuthInput, setShowAuthInput] = useState(false);
    const [showAuthButton, setShowAuthButton] = useState(false);
    const [showResetButton, setShowResetButton] = useState(false);
    const [authTime, setAuthTime] = useState('');

    const agentIdRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const authNoRef = useRef<HTMLInputElement>(null);
    const authTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Custom hook 사용
    const {
        login,
        requestAuth,
        resetPassword,
        isLoading,
        loginError,
        setLoginError
    } = useAuthorize({ onLoginSuccess, onLoginError });

    // 컴포넌트 언마운트 시 타이머 정리
    useEffect(() => {
        return () => {
            if (authTimerRef.current) {
                clearInterval(authTimerRef.current);
            }
        };
    }, []);

    // 로그인 처리
    const handleLogin = async () => {
        const agentId = agentIdRef.current?.value.trim() || '';
        const password = passwordRef.current?.value || '';
        const authNo = authNoRef.current?.value || '';

        if (showAuthInput && !authNo) {
            setLoginError('인증번호를 입력해주세요.');
            return;
        }

        await login({
            agentId,
            password,
            authNo: showAuthInput ? authNo : undefined
        });
    };

    // 인증번호 요청 처리
    const handleRequestAuth = async () => {
        const agentId = agentIdRef.current?.value.trim() || '';
        const result = await requestAuth(agentId);

        if (result.success) {
            setShowAuthInput(true);
            startAuthTimer();
        }
    };

    // 비밀번호 재설정 처리
    const handlePasswordReset = async () => {
        const agentId = agentIdRef.current?.value.trim() || '';
        await resetPassword(agentId);
    };

    // 인증 타이머 시작
    const startAuthTimer = () => {
        let remainingTime = 180;
        if (authTimerRef.current) {
            clearInterval(authTimerRef.current);
        }

        authTimerRef.current = setInterval(() => {
            remainingTime--;
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            setAuthTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);

            if (remainingTime <= 0) {
                if (authTimerRef.current) {
                    clearInterval(authTimerRef.current);
                }
                setAuthTime('시간 만료');
                setShowAuthInput(false);
            }
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isLoading) {
            handleLogin();
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="lg-content">
            <div className="info-write">
                <div className="agentID-wrap">
                    <input
                        ref={agentIdRef}
                        className="in-txt agentID"
                        id="agentID"
                        maxLength={64}
                        type="text"
                        onKeyPress={handleKeyPress}
                        placeholder="agent ID"
                        disabled={isLoading}
                    />
                </div>
                <div className="pwd-wrap">
                    <div className="loginPWD-wrap">
                        <input
                            ref={passwordRef}
                            className="in-txt loginPWD"
                            id="loginPWD"
                            maxLength={16}
                            type={showPassword ? "text" : "password"}
                            onKeyPress={handleKeyPress}
                            placeholder="비밀번호"
                            disabled={isLoading}
                        />
                    </div>
                    <span
                        className={`ic-eye ${showPassword ? 'view-on' : ''}`}
                        onClick={togglePasswordVisibility}
                    />
                </div>
                <div className="auth-wrap">
                    <input
                        ref={authNoRef}
                        className="in-txt"
                        id="LoginAuthNo"
                        maxLength={6}
                        type="text"
                        placeholder="인증번호"
                        style={{ display: showAuthInput ? 'block' : 'none' }}
                        disabled={isLoading}
                    />
                    <span className="auth-text" id="authCheckTime">
                        {authTime}
                    </span>
                </div>
            </div>
            <div className="lg-fail-txt">{loginError}</div>
            <div
                id="divReqAuth"
                style={{ display: showAuthButton ? 'block' : 'none' }}
            >
                <button
                    className="sm-btn"
                    type="button"
                    id="requeustAuthBtn"
                    onClick={handleRequestAuth}
                    disabled={isLoading}
                >
                    {isLoading ? '처리 중...' : '인증번호 요청'}
                </button>
            </div>
            <div className="set-btn">
                <div className="typeset">
                    <div className="right flex gap10 flex-align">
                        <div>
                            <input type="checkbox" id="id-rmb" />
                            <label htmlFor="id-rmb">
                                <span id="rmb">기억하기</span>
                            </label>
                        </div>
                        <div
                            id="divPwdReset"
                            style={{ display: showResetButton ? 'block' : 'none' }}
                        >
                            <button
                                className="sm-btn"
                                type="button"
                                id="pwdResetBtn"
                                onClick={handlePasswordReset}
                                disabled={isLoading}
                            >
                                {isLoading ? '처리 중...' : '비밀번호 재설정'}
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    className="lg-btn"
                    type="button"
                    id="loginBtn"
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? '로그인 중...' : '로그인'}
                </button>
            </div>
            <ul className="login_notice">
                <li>※ 아이디와 비밀번호 입력 시 대소문자를 구분합니다.</li>
            </ul>
        </div>
    );
};

export default LoginForm;