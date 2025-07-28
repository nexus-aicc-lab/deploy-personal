// src/features/board/types/board.types.ts
export interface Notice {
    id: string;
    title: string;
    content?: string;
    authorName: string;
    authorDepartment: string | null;
    viewCount: number;
    isImportant: boolean;
    isPinned: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
}

export interface GetNoticeListResponse {
    notices: Notice[];
    pagination: Pagination;
}

export interface GetNoticeDetailResponse {
    notice: Notice & {
        content: string;
    };
}

export interface CreateNoticeRequest {
    title: string;
    content: string;
    isImportant?: boolean;
    isPinned?: boolean;
}

export interface CreateNoticeResponse {
    notice: Notice;
}

export interface UpdateNoticeRequest {
    title?: string;
    content?: string;
    isImportant?: boolean;
    isPinned?: boolean;
}

export interface DeleteNoticeResponse {
    message: string;
}