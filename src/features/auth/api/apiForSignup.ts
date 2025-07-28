// src/features/auth/api/apiForSignup.ts
import axios from 'axios';

export interface SignupRequest {
    email: string;
    password: string;
    name: string;
}

export interface SignupResponse {
    id: number;
    email: string;
    name: string;
    createdAt: string;
}

export async function apiForSignup(payload: SignupRequest) {
    const response = await axios.post<SignupResponse>('/api/users/register', payload);
    return response.data;
}