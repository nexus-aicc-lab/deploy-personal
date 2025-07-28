// src/app/personal/board/notice/ui/CreateButtonForNoticeBoard.tsx
'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Checkbox } from '@/shared/ui/checkbox'
import { useCreateNotice } from '@/features/board/hooks/useNoticeBoard'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface NoticeFormData {
    title: string
    content: string
    isImportant: boolean
    isPinned: boolean
}

export default function CreateButtonForNoticeBoard() {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const createNotice = useCreateNotice()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<NoticeFormData>({
        defaultValues: {
            title: '',
            content: '',
            isImportant: false,
            isPinned: false
        }
    })

    const onSubmit = async (data: NoticeFormData) => {
        try {
            await createNotice.mutateAsync(data)
            toast.success('공지사항이 등록되었습니다.')
            setIsOpen(false)
            reset()
            router.refresh()
        } catch (error) {
            toast.error('공지사항 등록에 실패했습니다.')
            console.error('Failed to create notice:', error)
        }
    }

    // TODO: 실제로는 권한 체크 필요
    const isAdmin = true // 임시로 true 설정

    if (!isAdmin) return null

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                size="sm"
                className="flex items-center gap-1"
            >
                <Plus className="w-4 h-4" />
                <span>작성</span>
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>공지사항 작성</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">
                                제목 <span className="text-red-500">*</span>
                            </label>
                            <Input
                                {...register('title', {
                                    required: '제목을 입력해주세요.',
                                    maxLength: {
                                        value: 200,
                                        message: '제목은 200자 이내로 입력해주세요.'
                                    }
                                })}
                                placeholder="공지사항 제목을 입력하세요"
                                className="w-full"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1.5 block">
                                내용 <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                {...register('content', {
                                    required: '내용을 입력해주세요.'
                                })}
                                placeholder="공지사항 내용을 입력하세요"
                                className="w-full min-h-[200px]"
                            />
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isImportant"
                                    {...register('isImportant')}
                                />
                                <label
                                    htmlFor="isImportant"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    중요 공지로 설정
                                </label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isPinned"
                                    {...register('isPinned')}
                                />
                                <label
                                    htmlFor="isPinned"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    상단 고정
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsOpen(false)
                                    reset()
                                }}
                            >
                                취소
                            </Button>
                            <Button
                                type="submit"
                                disabled={createNotice.isPending}
                            >
                                {createNotice.isPending ? '등록 중...' : '등록'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}