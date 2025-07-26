// src/features/auth/api/apiForLogin.ts

import axiosInstance from "@/lib/axios";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

export async function apiForLogin(payload: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>('/cubetoken', payload);

    // 토큰 저장
    if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
    }
    if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
    }

    return response.data;
}

// 로그아웃 API
export async function apiForLogout(): Promise<void> {
    try {
        await axiosInstance.post('/api/auth/logout');
    } finally {
        // 로컬 스토리지 토큰 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}

// 토큰 리프레시 API
export async function apiForRefreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await axiosInstance.post<{ accessToken: string }>('/api/auth/refresh', {
        refreshToken,
    });

    if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
    }

    return response.data;
}

// 현재 사용자 정보 조회 API
export async function apiForGetCurrentUser(): Promise<LoginResponse['user']> {
    const response = await axiosInstance.get<LoginResponse['user']>('/api/auth/me');
    return response.data;
}