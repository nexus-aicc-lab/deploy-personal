// src/features/auth/api/apiForAuthorize.ts

import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';

export interface AuthorizeRequest {
    authorize: {
        agent: string;
        password: string;
    };
}

export interface AuthorizeResponse {
    result: {
        center: string;
        config: {
            counsel: {
                date_type: string;
                range: string;
            };
            info: string;
            minibar: string;
            statistics: {
                items: string[];
                queues: string;
            };
        };
        cube_token: string;
        dn: string;
        error_code: number;
        error_message: string;
        login_id: string;
        name: string;
        redis: {
            ip: string;
            password: string;
            port: string;
        };
        tenant: string;
    };
}

/**
 * 로그인 인증 API
 * @param agent - 에이전트 ID
 * @param password - 암호화된 비밀번호
 * @returns 인증 결과 및 설정 정보
 */
export async function apiForAuthorize(agent: string, password: string): Promise<AuthorizeResponse> {
    try {
        console.log('[API] Authorizing user...');
        console.log('[API] Agent:', agent);
        console.log('[API] Encrypted password length:', password.length);

        const requestBody: AuthorizeRequest = {
            authorize: {
                agent,
                password
            }
        };

        // axios baseURL이 '/api'이므로 '/auth/authorize'로 요청
        const response = await axiosInstance.post<AuthorizeResponse>(
            '/authorize',
            requestBody
        );

        console.log('[API] Authorization response:', response.data);

        // 응답 검증
        if (!response.data.result) {
            throw new Error('Invalid response format: missing result');
        }

        // 에러 코드 확인
        if (response.data.result.error_code !== 0) {
            throw new Error(response.data.result.error_message || '인증에 실패했습니다.');
        }

        return response.data;
    } catch (error) {
        console.error('[API] Authorization error:', error);

        // Axios 에러 처리
        if (error instanceof AxiosError) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            if (error.response?.status === 401) {
                throw new Error('인증에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
            }
            if (error.message) {
                throw new Error(error.message);
            }
        }

        // 일반 에러 처리
        if (error instanceof Error) {
            throw error;
        }

        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

/**
 * 로그인 인증 API (간편 버전)
 * @param credentials - 로그인 정보
 * @returns 인증 결과
 */
export async function authorize(credentials: {
    agent: string;
    password: string;
}): Promise<AuthorizeResponse> {
    return apiForAuthorize(credentials.agent, credentials.password);
}

/**
 * 인증 결과에서 필요한 정보만 추출
 */
export interface AuthInfo {
    agentName: string;
    cubeToken: string;
    center: string;
    tenant: string;
    redis: {
        ip: string;
        password: string;
        port: string;
    };
    config: {
        counsel: {
            date_type: string;
            range: string;
        };
        info: string;
        minibar: string;
        statistics: {
            items: string[];
            queues: string;
        };
    };
}

/**
 * 인증 응답에서 필요한 정보 추출
 */
export function extractAuthInfo(response: AuthorizeResponse): AuthInfo {
    const { result } = response;
    return {
        agentName: result.name,
        cubeToken: result.cube_token,
        center: result.center,
        tenant: result.tenant,
        redis: result.redis,
        config: result.config
    };
}