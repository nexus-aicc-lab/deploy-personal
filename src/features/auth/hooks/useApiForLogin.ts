// src/features/auth/hooks/useApiForLogin.ts
import { useMutation } from '@tanstack/react-query';
import { apiForLogin, LoginRequest, LoginResponse } from '../api/apiForLogin';

export function useApiForLogin() {
    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: apiForLogin,
    });
}