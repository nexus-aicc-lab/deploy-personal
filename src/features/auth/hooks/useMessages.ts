// src/features/chat/hooks/useMessages.ts
import { apiForGetMessages, apiForSendMessage, Message } from '@/features/chat/apiForGetMessages'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useMessages(chatRoomId: string | null) {
    return useQuery<Message[], Error>({
        queryKey: ['messages', chatRoomId],
        queryFn: () => {
            if (!chatRoomId) throw new Error('채팅방 ID가 필요합니다')
            return apiForGetMessages(chatRoomId)
        },
        enabled: !!chatRoomId,
        staleTime: 1000 * 30,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
    })
}

// userId 파라미터 추가
export function useSendMessage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ chatRoomId, content, userId }: { chatRoomId: string, content: string, userId: number }) =>
            apiForSendMessage(chatRoomId, content, userId),
        onSuccess: (newMessage, { chatRoomId }) => {
            queryClient.invalidateQueries({
                queryKey: ['messages', chatRoomId]
            })

            queryClient.invalidateQueries({
                queryKey: ['chatRooms']
            })
        },
        onError: (error) => {
            console.error('메시지 전송 실패:', error)
        }
    })
}