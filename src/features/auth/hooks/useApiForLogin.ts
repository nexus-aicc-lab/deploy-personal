// src/features/auth/hooks/useApiForLogin.ts
import { useMutation } from '@tanstack/react-query';
import { apiForLogin, LoginRequest, LoginResponse } from '../api/apiForLogin';

export const useApiForLogin = () =>
    useMutation<LoginResponse, any, LoginRequest>({
        mutationFn: apiForLogin,
    });
