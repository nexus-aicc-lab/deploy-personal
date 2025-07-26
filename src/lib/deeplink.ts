// src/lib/deeplink.ts

/**
 * 딥링크 실행 (단순 버전)
 * @param path 딥링크 경로 (예: 'login', 'password-reset', 'auth-request')
 * @param params 쿼리 파라미터 객체
 * @param confirm 실행 전 확인 여부
 * @returns 실행 성공 여부
 */
export const openDeepLink = (
    path: string,
    params: Record<string, any> = {},
    confirm: boolean = false
): boolean => {
    // 쿼리 파라미터 생성
    const queryString = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
    ).toString();

    // 딥링크 URL 생성
    const url = `cti-personal://${path}${queryString ? `?${queryString}` : ''}`;

    // 확인이 필요한 경우
    if (confirm && !window.confirm('CTI Task Master 앱으로 이동하시겠습니까?')) {
        return false;
    }

    console.log('🚀 딥링크 실행:', url);
    window.location.href = url;
    return true;
};

// 사용 예시:
// openDeepLink('login', { token: 'abc123', agentId: 'user01' });
// openDeepLink('password-reset', { token: 'xyz789', agentId: 'user01' }, true);
// openDeepLink('auth-request', { action: 'request_auth_code' });