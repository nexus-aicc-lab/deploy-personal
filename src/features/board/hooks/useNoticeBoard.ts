// C:\deploy-server\deploy-personal2\src\features\board\hooks\useNoticeBoard.ts

// src/features/board/hooks/useNoticeBoard.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForGetNoticeBoardList } from '../api/apiForGetNoticeBoardList';
import { apiForGetNoticeBoardDetail } from '../api/apiForGetNoticeBoardDetail';
import { apiForCreateNoticeBoard } from '../api/apiForCreateNoticeBoard';
import type { CreateNoticeRequest } from '../types/board.types';

// 공지사항 목록 조회
export const useNoticeList = (params?: { page?: number; limit?: number; search?: string }) => {
    return useQuery({
        queryKey: ['noticeList', params],
        queryFn: () => apiForGetNoticeBoardList(params),
    });
};

// 공지사항 상세 조회
export const useNoticeDetail = (noticeId: string) => {
    return useQuery({
        queryKey: ['noticeDetail', noticeId],
        queryFn: () => apiForGetNoticeBoardDetail(noticeId),
        enabled: !!noticeId,
    });
};

// 공지사항 생성
export const useCreateNotice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateNoticeRequest) => apiForCreateNoticeBoard(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['noticeList'] });
        },
    });
};