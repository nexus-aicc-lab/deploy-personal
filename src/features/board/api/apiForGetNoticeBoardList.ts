// src/features/board/api/apiForGetNoticeBoardList.ts

import axios from 'axios';
import type { GetNoticeListResponse } from '../types/board.types';

interface GetNoticeListParams {
    page?: number;
    limit?: number;
    search?: string;
}

export const apiForGetNoticeBoardList = async (
    params?: GetNoticeListParams
): Promise<GetNoticeListResponse> => {
    try {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.search) queryParams.append('search', params.search);

        const response = await axios.get<GetNoticeListResponse>(
            `/api/board/notice${queryParams.toString() ? `?${queryParams}` : ''}`
        );

        return response.data;
    } catch (error) {
        console.error('Failed to fetch notice list:', error);
        throw error;
    }
};