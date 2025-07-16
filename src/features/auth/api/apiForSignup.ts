// src/features/auth/api/apiForSignup.ts
import axios from 'axios';

export interface SignupRequest {
    email: string;
    password: string;
    name: string;
}

export interface SignupResponse {
    message: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

export async function apiForSignup(payload: SignupRequest) {
    const response = await axios.post<SignupResponse>('/api/auth/signup', payload);
    return response.data;
}
