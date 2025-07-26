import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiForLogin, LoginRequest, LoginResponse } from '../api/apiForLogin';

type LoginErrorResponse = {
    error: string;
};

export const useApiForLogin = () =>
    useMutation<LoginResponse, AxiosError<LoginErrorResponse>, LoginRequest>({
        mutationFn: apiForLogin,
    });
