// src/features/chat/hooks/useChatRooms.ts
import { apiForGetChatRooms, ChatRoom } from '@/features/chat/apiForGetChatRooms'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useChatRooms() {
    return useQuery<ChatRoom[], Error>({
        queryKey: ['chatRooms'],
        queryFn: apiForGetChatRooms,
        staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
        gcTime: 1000 * 60 * 10, // 10분간 캐시 유지 (구 cacheTime)
        refetchOnWindowFocus: false,
        retry: 1,
    })
}

// 특정 채팅방 리프레시를 위한 훅
export function useRefreshChatRooms() {
    const queryClient = useQueryClient()

    return () => {
        queryClient.invalidateQueries({
            queryKey: ['chatRooms']
        })
    }
}

// 개별 채팅방 조회를 위한 훅 (나중에 사용)
export function useChatRoom(chatRoomId: string | null) {
    return useQuery<ChatRoom | null, Error>({
        queryKey: ['chatRoom', chatRoomId],
        queryFn: () => {
            if (!chatRoomId) return null
            // 여기서 개별 채팅방 API 호출
            return apiForGetChatRooms().then(rooms =>
                rooms.find(room => room.id.toString() === chatRoomId) || null
            )
        },
        enabled: !!chatRoomId,
        staleTime: 1000 * 60 * 5,
    })
}