// src/features/auth/api/apiForLogin.ts

import axiosInstance2 from "@/lib/axios2";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;      // JWT 토큰
    userId: number;
    email: string;
    name: string;
}

export interface RegisterRequest {
    email: string;
    name: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    name: string;
    createdAt?: Date;
}

// 로그인 API
export async function apiForLogin(payload: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance2.post<LoginResponse>('/api/users/login', payload);

    // 토큰 및 사용자 정보 저장
    if (response.data.token) {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('userId', response.data.userId.toString());
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userName', response.data.name);
    }

    return response.data;
}

// 회원가입 API
export async function apiForRegister(payload: RegisterRequest): Promise<User> {
    const response = await axiosInstance2.post<User>('/api/users/register', payload);
    return response.data;
}

// 로그아웃 함수 (API 호출 없이 로컬 처리)
export function apiForLogout(): void {
    // 로컬 스토리지 토큰 및 사용자 정보 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');

    // 로그인 페이지로 리다이렉트
    window.location.href = '/personal/login';
}

// 전체 사용자 목록 조회 API
export async function apiForGetAllUsers(): Promise<User[]> {
    const response = await axiosInstance2.get<User[]>('/api/users');
    return response.data;
}

// 특정 사용자 정보 조회 API
export async function apiForGetUserById(userId: number): Promise<User> {
    const response = await axiosInstance2.get<User>(`/api/users/${userId}`);
    return response.data;
}

// 현재 로그인한 사용자 정보 가져오기 (로컬 스토리지에서)
export function getCurrentUser(): LoginResponse | null {
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');
    const token = localStorage.getItem('accessToken');

    if (!userId || !email || !name || !token) {
        return null;
    }

    return {
        userId: parseInt(userId),
        email,
        name,
        token,
    };
}

// 인증 상태 확인
export function isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
}

// 토큰 가져오기
export function getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
}