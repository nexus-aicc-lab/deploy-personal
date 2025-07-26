// src/lib/deeplink.ts

interface LoginDeepLinkParams {
    token: string;
    agentId: string;
    password?: string;
    timestamp?: number;
    authCode?: string;
}

interface PasswordResetDeepLinkParams {
    token: string;
    agentId: string;
    timestamp?: number;
}

interface AuthRequestDeepLinkParams {
    token: string;
    agentId: string;
    action?: string;
}

/**
 * 로그인 딥링크 URL 생성
 */
export const createLoginDeepLink = (params: LoginDeepLinkParams): string => {
    const {
        token,
        agentId,
        password,
        timestamp = Date.now(),
        authCode
    } = params;

    const queryParams = new URLSearchParams({
        token: token,
        agentId: agentId,
        timestamp: timestamp.toString(),
        session_id: `sess_${timestamp}`,
        login_method: 'web_form'
    });

    if (password) {
        queryParams.append('password', password);
    }

    if (authCode) {
        queryParams.append('auth_code', authCode);
    }

    return `cti-personal://login?${queryParams.toString()}`;
};

/**
 * 비밀번호 재설정 딥링크 URL 생성
 */
export const createPasswordResetDeepLink = (params: PasswordResetDeepLinkParams): string => {
    const {
        token,
        agentId,
        timestamp = Date.now()
    } = params;

    const queryParams = new URLSearchParams({
        token: token,
        agentId: agentId,
        timestamp: timestamp.toString()
    });

    return `cti-personal://password-reset?${queryParams.toString()}`;
};

/**
 * 인증번호 요청 딥링크 URL 생성
 */
export const createAuthRequestDeepLink = (params: AuthRequestDeepLinkParams): string => {
    const {
        token,
        agentId,
        action = 'request_auth_code'
    } = params;

    const queryParams = new URLSearchParams({
        token: token,
        agentId: agentId,
        action: action
    });

    return `cti-personal://auth-request?${queryParams.toString()}`;
};

/**
 * 딥링크 실행
 * @param url 딥링크 URL
 * @param confirmMessage 확인 메시지 (optional)
 * @returns 실행 성공 여부
 */
export const executeDeepLink = (url: string, confirmMessage?: string): boolean => {
    if (confirmMessage) {
        const confirmed = window.confirm(confirmMessage);
        if (!confirmed) {
            console.log('❌ 사용자가 딥링크 실행을 취소했습니다.');
            return false;
        }
    }

    console.log('🚀 딥링크 실행:', url);
    window.location.href = url;
    return true;
};

/**
 * 로그인 딥링크 실행 헬퍼
 */
export const executeLoginDeepLink = (params: LoginDeepLinkParams): boolean => {
    const url = createLoginDeepLink(params);
    const confirmMessage = `CTI Task Master 앱으로 이동하시겠습니까?\n\n` +
        `사용자: ${params.agentId}\n` +
        `세션 ID: sess_${params.timestamp || Date.now()}`;

    return executeDeepLink(url, confirmMessage);
};