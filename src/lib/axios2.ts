// C:\deploy-server\deploy-personal2\src\lib\axios2.ts

// C:\deploy-server\deploy-personal2\src\lib\axios2.ts
import axios from 'axios';

// Next.js 로컬 API Routes용 axios 인스턴스
const axiosInstance = axios.create({
    baseURL: '', // 빈 문자열로 설정하여 상대 경로 사용
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`[Axios2 - Local API] ${config.method?.toUpperCase()} ${config.url}`, config.data);

        // 토큰이 있다면 추가
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error('[Axios2 - Local API] Request error:', error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`[Axios2 - Local API] Response:`, response.data);
        return response;
    },
    (error) => {
        console.error('[Axios2 - Local API] Response error:', error.response?.data || error.message);

        // 401 에러 처리 (인증 만료)
        if (error.response?.status === 401) {
            // 로그인 페이지로 리다이렉트
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');

            window.location.href = '/personal/dashboard';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;