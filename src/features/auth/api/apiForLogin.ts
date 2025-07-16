// src/features/auth/api/apiForLogin.ts
import axios from 'axios';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

export async function apiForLogin(payload: LoginRequest) {
    const response = await axios.post<LoginResponse>('/api/auth/login', payload);
    return response.data;
}
