// src/db/seed/chat-seed.ts
import { db } from '@/db';
import { chatRooms, chatParticipants, messages } from '@/db/schema/chat';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

const sampleChatRooms = [
    {
        name: '김철수',
        type: 'direct',
    },
    {
        name: '마케팅팀 단톡방',
        type: 'group',
    },
    {
        name: '박영희',
        type: 'direct',
    },
    {
        name: '개발팀',
        type: 'group',
    },
    {
        name: '이민수',
        type: 'direct',
    },
];

const sampleMessages = [
    {
        content: '안녕하세요! 내일 회의 준비는 어떻게 되고 있나요?',
        type: 'text',
    },
    {
        content: '안녕하세요! 회의 자료는 거의 완성되었고, 내일 오전에 최종 검토 후 보내드릴 예정입니다.',
        type: 'text',
    },
    {
        content: '네, 내일 회의 자료 준비해서 보내드릴게요!',
        type: 'text',
    },
    {
        content: '안녕하세요 여러분! 이번 분기 마케팅 캠페인 기획안을 공유드립니다.',
        type: 'text',
    },
    {
        content: '좋은 아이디어네요! 타겟 고객층 분석이 특히 인상깊습니다.',
        type: 'text',
    },
    {
        content: '이번 캠페인 기획안 어떻게 생각하시나요?',
        type: 'text',
    },
];

export async function seedChat() {
    try {
        console.log('🌱 채팅 시드 시작...');

        // 기존 users 확인
        const existingUsers = await db.select().from(users).limit(5);
        if (existingUsers.length === 0) {
            console.log('❌ users 테이블에 데이터가 없습니다. 먼저 사용자를 생성해주세요.');
            return;
        }
        console.log(`✅ ${existingUsers.length}명의 사용자 발견`);

        // 기존 채팅 데이터 삭제 (개발 환경에서만)
        await db.delete(messages);
        await db.delete(chatParticipants);
        await db.delete(chatRooms);
        console.log('기존 채팅 데이터 삭제 완료');

        // 채팅방 생성
        const createdRooms = [];
        for (const room of sampleChatRooms) {
            const [createdRoom] = await db.insert(chatRooms).values(room).returning();
            createdRooms.push(createdRoom);
            console.log(`✅ 채팅방 생성: ${room.name}`);
        }

        // 채팅방 참가자 추가
        for (let i = 0; i < createdRooms.length; i++) {
            const room = createdRooms[i];

            if (room.type === 'direct') {
                // 1:1 채팅방 - 2명 참가
                await db.insert(chatParticipants).values([
                    {
                        chatRoomId: room.id,
                        userId: existingUsers[0].id, // 첫 번째 사용자
                    },
                    {
                        chatRoomId: room.id,
                        userId: existingUsers[Math.min(i + 1, existingUsers.length - 1)].id, // 다른 사용자
                    }
                ]);
            } else {
                // 그룹 채팅방 - 3-4명 참가
                const participantCount = Math.min(4, existingUsers.length);
                for (let j = 0; j < participantCount; j++) {
                    await db.insert(chatParticipants).values({
                        chatRoomId: room.id,
                        userId: existingUsers[j].id,
                    });
                }
            }
            console.log(`✅ 참가자 추가: ${room.name}`);
        }

        // 메시지 생성
        for (let i = 0; i < Math.min(sampleMessages.length, createdRooms.length); i++) {
            const room = createdRooms[Math.floor(i / 2)]; // 각 방에 여러 메시지
            const message = sampleMessages[i];

            // 해당 채팅방의 참가자 중 한 명을 발신자로 설정
            const roomParticipants = await db
                .select()
                .from(chatParticipants)
                .where(eq(chatParticipants.chatRoomId, room.id));

            if (roomParticipants.length > 0) {
                await db.insert(messages).values({
                    chatRoomId: room.id,
                    senderId: roomParticipants[i % roomParticipants.length].userId,
                    content: message.content,
                    type: message.type,
                });
                console.log(`✅ 메시지 추가: ${message.content.substring(0, 30)}...`);
            }
        }

        console.log(`\n✅ 채팅 시드 데이터 생성 완료!`);
        console.log(`📊 채팅방: ${createdRooms.length}개`);

        // 확인 쿼리
        const totalMessages = await db.select().from(messages);
        console.log(`📊 메시지: ${totalMessages.length}개`);

    } catch (error) {
        console.error('❌ 채팅 시드 데이터 생성 실패:', error);
    }
}

// 파일이 직접 실행될 때만 실행
if (require.main === module) {
    seedChat()
        .then(() => {
            console.log('✨ 완료!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 에러:', error);
            process.exit(1);
        });
}