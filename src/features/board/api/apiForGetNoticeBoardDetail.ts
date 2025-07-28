// src/features/board/api/apiForGetNoticeBoardDetail.ts

import axios from 'axios';
import type { GetNoticeDetailResponse } from '../types/board.types';

export const apiForGetNoticeBoardDetail = async (
    noticeId: string
): Promise<GetNoticeDetailResponse> => {
    try {
        const response = await axios.get<GetNoticeDetailResponse>(
            `/api/board/notice/${noticeId}`
        );

        return response.data;
    } catch (error) {
        console.error('Failed to fetch notice detail:', error);
        throw error;
    }
};