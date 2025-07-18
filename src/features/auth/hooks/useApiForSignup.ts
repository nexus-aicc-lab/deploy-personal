// src/features/auth/hooks/useApiForSignup.ts
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiForSignup, SignupRequest, SignupResponse } from '../api/apiForSignup';

type SignupErrorResponse = {
    error?: string;
};

export function useApiForSignup() {
    return useMutation<SignupResponse, AxiosError<SignupErrorResponse>, SignupRequest>({
        mutationFn: apiForSignup,
    });
}
