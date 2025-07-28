// src/features/board/api/apiForCreateNoticeBoard.ts

import axios from 'axios';
import type { CreateNoticeRequest, CreateNoticeResponse } from '../types/board.types';

export const apiForCreateNoticeBoard = async (
    data: CreateNoticeRequest
): Promise<CreateNoticeResponse> => {
    try {
        const response = await axios.post<CreateNoticeResponse>(
            '/api/board/notice',
            data
        );

        return response.data;
    } catch (error) {
        console.error('Failed to create notice:', error);
        throw error;
    }
};