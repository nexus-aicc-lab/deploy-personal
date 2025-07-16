// src/features/auth/hooks/useApiForSignup.ts
import { useMutation } from '@tanstack/react-query';
import { apiForSignup, SignupRequest, SignupResponse } from '../api/apiForSignup';

export function useApiForSignup() {
    return useMutation<SignupResponse, any, SignupRequest>({
        mutationFn: apiForSignup,
    });
}
