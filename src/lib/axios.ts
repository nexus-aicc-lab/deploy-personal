// // src/lib/axios.ts
// import axios from 'axios';

// // Next.js API Routes를 통해 백엔드와 통신
// const baseURL = '/personal/api';  // '/api/auth' 대신 '/api'로 변경

// // axios 인스턴스 생성
// const axiosInstance = axios.create({
//     baseURL,
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // 요청 인터셉터
// axiosInstance.interceptors.request.use(
//     (config) => {
//         console.log(`[Axios] ${config.method?.toUpperCase()} ${config.url}`, config.data);

//         // 토큰이 있다면 추가
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => {
//         console.error('[Axios] Request error:', error);
//         return Promise.reject(error);
//     }
// );

// // 응답 인터셉터
// axiosInstance.interceptors.response.use(
//     (response) => {
//         console.log(`[Axios] Response:`, response.data);
//         return response;
//     },
//     (error) => {
//         console.error('[Axios] Response error:', error.response?.data || error.message);

//         // 401 에러 처리 (인증 만료)
//         if (error.response?.status === 401) {
//             // 로그인 페이지로 리다이렉트
//             window.location.href = '/login';
//         }

//         return Promise.reject(error);
//     }
// );

// // default export로 axios 인스턴스 직접 내보내기
// export default axiosInstance;

// src/lib/axios.ts
import axios from 'axios';

// 백엔드 API 직접 호출 (CORS 설정 필요)
const baseURL = 'https://ucti186.nexuscommunity.kr:21004/personal';

// axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`[Axios] ${config.method?.toUpperCase()} ${config.url}`, config.data);

        // 토큰이 있다면 추가
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error('[Axios] Request error:', error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`[Axios] Response:`, response.data);
        return response;
    },
    (error) => {
        console.error('[Axios] Response error:', error.response?.data || error.message);

        // 401 에러 처리 (인증 만료)
        if (error.response?.status === 401) {
            // personal 로그인 페이지로 리다이렉트
            window.location.href = '/personal/login';
        }

        return Promise.reject(error);
    }
);

// default export로 axios 인스턴스 직접 내보내기
export default axiosInstance;