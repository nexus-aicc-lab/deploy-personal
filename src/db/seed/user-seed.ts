// src/db/seed/user-seed.ts
import { db } from '@/db';
import { users } from '../schema/users';
import bcrypt from 'bcrypt';

const sampleUsers = [
    {
        name: '유상무',
        email: 'ucti1@nexus.co.kr',
        password: 'nexus!234'
    },
    {
        name: '박소연',
        email: 'ucti2@nexus.co.kr',
        password: 'nexus!234'
    },
    {
        name: '홍성래',
        email: 'ucti3@nexus.co.kr',
        password: 'nexus!234'
    },
    {
        name: '유초원',
        email: 'ucti4@nexus.co.kr',
        password: 'nexus!234'
    },
    {
        name: '임지선',
        email: 'ucti5@nexus.co.kr',
        password: 'nexus!234'
    },
    {
        name: '이승용',
        email: 'ucti6@nexus.co.kr',
        password: 'nexus!234'
    },
    {
        name: '이정수',
        email: 'ucti7@nexus.co.kr',
        password: 'nexus!234'
    },
    {
        name: '전영희',
        email: 'ucti8@nexus.co.kr',
        password: 'nexus!234'
    },
    // 관리자 계정
    {
        name: '관리자',
        email: 'admin@nexus.co.kr',
        password: 'nexus!234'
    }
];

export async function seedUsers() {
    try {
        console.log('🌱 사용자 시드 시작...');

        // 기존 데이터 삭제
        await db.delete(users);
        console.log('기존 사용자 데이터 삭제 완료');

        let insertedCount = 0;
        for (const user of sampleUsers) {
            try {
                const hashedPassword = await bcrypt.hash(user.password, 10);

                await db.insert(users).values({
                    name: user.name,
                    email: user.email,
                    password: hashedPassword,
                });

                console.log(`✅ 추가됨: ${user.name} (${user.email})`);
                insertedCount++;
            } catch (error: any) {
                if (error.code === '23505') {
                    console.log(`⚠️  이미 존재: ${user.email}`);
                } else {
                    throw error;
                }
            }
        }

        console.log(`\n✅ 총 ${insertedCount}개의 사용자 계정 생성 완료!`);

        const allUsers = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            createdAt: users.createdAt
        }).from(users);

        console.log(`\n📊 DB 확인: 현재 ${allUsers.length}명의 사용자가 있습니다.`);
        console.log('\n등록된 사용자 목록:');
        allUsers.forEach(user => {
            console.log(`  - ${user.name} (${user.email})`);
        });

    } catch (error) {
        console.error('❌ 시드 데이터 생성 실패:', error);
        throw error;
    }
}

if (require.main === module) {
    seedUsers()
        .then(() => {
            console.log('\n✨ 사용자 시드 완료!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 에러:', error);
            process.exit(1);
        });
}
