// src/features/auth/hooks/useAuthorize.ts
import { useState, useCallback } from 'react';
import { apiForGetSalt } from '@/features/auth/api/apiForGetSalt';
import { apiForAuthorize, extractAuthInfo } from '@/features/auth/api/apiForAuthorize';
import { encryptPassword } from '@/shared/lib/crypto';
import {
    openDeepLink
} from '@/lib/deeplink';

interface UseAuthorizeProps {
    onLoginSuccess?: (token: string, agentId: string) => void;
    onLoginError?: (error: string) => void;
}

interface LoginParams {
    agentId: string;
    password: string;
    authNo?: string;
}

export const useAuthorize = ({ onLoginSuccess, onLoginError }: UseAuthorizeProps = {}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [cubeToken, setCubeToken] = useState<string | null>(null);

    // Salt 토큰 요청
    const getSaltToken = useCallback(async (agentId: string) => {
        try {
            console.log('Salt 토큰 요청 중...');
            const response = await apiForGetSalt(agentId);

            if (response.result.error_code === 0) {
                setCubeToken(response.result.cube_token);
                console.log('Salt 토큰 받기 성공:', response.result.cube_token);
                return response.result.cube_token;
            } else {
                const errorMsg = response.result.error_message || 'Salt 토큰 요청 실패';
                setLoginError(errorMsg);
                if (onLoginError) onLoginError(errorMsg);
                return null;
            }
        } catch (error) {
            console.error('Salt 토큰 요청 에러:', error);
            const errorMsg = '인증 토큰 요청 중 오류가 발생했습니다.';
            setLoginError(errorMsg);
            if (onLoginError) onLoginError(errorMsg);
            return null;
        }
    }, [onLoginError]);

    // 로그인 처리
    const login = useCallback(async ({ agentId, password, authNo }: LoginParams) => {
        // 입력값 검증
        if (!agentId) {
            setLoginError('아이디를 입력해주세요.');
            return { success: false };
        }
        if (!password) {
            setLoginError('비밀번호를 입력해주세요.');
            return { success: false };
        }

        setIsLoading(true);
        setLoginError('');

        openDeepLink('login', {
            token: "test-token",
            agentId: agentId,
            timestamp: Date.now(),
            session_id: `sess_${Date.now()}`,
            login_method: 'web_form'
        });

        try {
            // 1. Salt 토큰 요청
            const token = await getSaltToken(agentId);
            console.log('Salt 토큰:', token);

            if (!token) {
                return { success: false };
            }

            // 2. 비밀번호 암호화
            const encryptedPassword = encryptPassword(password, token);

            // 3. 로그인 정보 로깅
            console.log('로그인 시도:', {
                agentId,
                cubeToken: token,
                encryptedPassword,
                authNo
            });

            // 4. API 호출하여 로그인 인증 수행
            console.log('📞 로그인 API 호출 중...');
            const response = await apiForAuthorize(agentId, encryptedPassword);

            // 5. 응답 로그 출력
            console.log('✅ 로그인 API 응답:', response);

            // 6. 인증 정보 추출
            const authInfo = extractAuthInfo(response);
            console.log('🔑 추출된 인증 정보:', authInfo);

            // 7. 성공 콜백 호출
            if (onLoginSuccess) {
                onLoginSuccess(response.result.cube_token, agentId);
            }

            console.log('✅ 로그인 성공!');

            // 딥링크 실행 (openDeepLink 함수 사용)
            openDeepLink('login', {
                token: response.result.cube_token,
                agentId: agentId,
                timestamp: Date.now(),
                session_id: `sess_${Date.now()}`,
                login_method: 'web_form'
            });

            return {
                success: true,
                token: response.result.cube_token,
                agentId,
                authInfo
            };

        } catch (error) {
            console.error('❌ 로그인 에러:', error);

            let errorMsg = '로그인 중 오류가 발생했습니다.';

            // 에러 메시지 구체화
            if (error instanceof Error) {
                errorMsg = error.message;
                console.error('❌ 에러 상세:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
            }

            setLoginError(errorMsg);
            if (onLoginError) onLoginError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setIsLoading(false);
        }
    }, [getSaltToken, onLoginSuccess, onLoginError]);

    // 인증번호 요청
    const requestAuth = useCallback(async (agentId: string) => {
        if (!agentId) {
            setLoginError('아이디를 입력해주세요.');
            return { success: false };
        }

        setIsLoading(true);
        setLoginError('');

        try {
            console.log('인증번호 요청');
            const token = await getSaltToken(agentId);
            if (!token) {
                return { success: false };
            }

            // TODO: 실제 인증번호 요청 API 호출
            // await apiForRequestAuth({ agentId, cubeToken: token });

            console.log('인증번호가 발송되었습니다.');
            return { success: true };
        } catch (error) {
            console.error('인증번호 요청 에러:', error);
            setLoginError('인증번호 요청 중 오류가 발생했습니다.');
            return { success: false };
        } finally {
            setIsLoading(false);
        }
    }, [getSaltToken]);

    // 비밀번호 재설정
    const resetPassword = useCallback(async (agentId: string) => {
        if (!agentId) {
            setLoginError('아이디를 입력해주세요.');
            return { success: false };
        }

        setIsLoading(true);
        setLoginError('');

        try {
            console.log('비밀번호 재설정');
            const token = await getSaltToken(agentId);
            if (!token) {
                return { success: false };
            }

            // 딥링크 URL 생성 및 실행
            // const resetUrl = createPasswordResetDeepLink({
            //     token,
            //     agentId
            // });

            // console.log('🔒 비밀번호 재설정 딥링크:', resetUrl);
            // executeDeepLink(resetUrl);

            return { success: true };
        } catch (error) {
            console.error('비밀번호 재설정 에러:', error);
            setLoginError('비밀번호 재설정 중 오류가 발생했습니다.');
            return { success: false };
        } finally {
            setIsLoading(false);
        }
    }, [getSaltToken]);

    return {
        login,
        requestAuth,
        resetPassword,
        isLoading,
        loginError,
        setLoginError,
        cubeToken
    };
};