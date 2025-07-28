// src/db/seed/notice-seed.ts
import { db } from '@/db';
import { boardPosts } from '../schema/board_posts';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

const sampleNotices = [
    {
        title: '[중요] 시스템 정기 점검 안내',
        content: '안녕하세요. UCTI Personal 관리자입니다.\n\n다음과 같이 시스템 정기 점검을 실시할 예정이오니 참고 부탁드립니다.\n\n■ 점검 일시: 2024년 1월 20일(토) 02:00 ~ 06:00 (4시간)\n■ 점검 내용: 서버 보안 패치 및 데이터베이스 최적화\n■ 영향: 점검 시간 동안 서비스 이용 불가\n\n점검 시간 동안 불편을 드려 죄송합니다.\n보다 나은 서비스를 위해 최선을 다하겠습니다.\n\n감사합니다.',
        authorName: '관리자',
        authorDepartment: '시스템관리팀',
        isImportant: true,
        isPinned: true,
        viewCount: 234,
    },
    {
        title: '새로운 기능 업데이트 안내',
        content: '이번 업데이트에서 추가된 주요 기능을 안내드립니다.\n\n1. 다크모드 지원\n2. 실시간 알림 기능\n3. 파일 드래그앤드롭 업로드\n4. 검색 필터 기능 강화\n\n자세한 사용법은 매뉴얼을 참고해주세요.',
        authorName: '개발팀',
        authorDepartment: '개발팀',
        isImportant: false,
        isPinned: false,
        viewCount: 156,
    },
    {
        title: '2024년 1월 정기 회의 일정',
        content: '2024년 1월 정기 회의 일정을 공유드립니다.\n\n날짜: 2024년 1월 25일(목)\n시간: 오후 2시\n장소: 3층 대회의실\n\n참석 대상: 전 직원',
        authorName: '운영팀',
        authorDepartment: '운영팀',
        isImportant: false,
        isPinned: false,
        viewCount: 89,
    },
    {
        title: '보안 정책 변경 사항',
        content: '보안 강화를 위해 다음과 같이 정책이 변경됩니다.\n\n- 비밀번호 변경 주기: 90일\n- 2단계 인증 의무화\n- VPN 사용 권장\n\n시행일: 2024년 2월 1일부터',
        authorName: '보안팀',
        authorDepartment: '보안팀',
        isImportant: true,
        isPinned: false,
        viewCount: 201,
    },
    {
        title: '신입 직원 환영합니다',
        content: '2024년 상반기 신입 직원을 환영합니다!\n\n입사일: 2024년 1월 15일\n오리엔테이션: 1월 15일 오전 9시\n\n모두 따뜻하게 맞이해주세요.',
        authorName: '인사팀',
        authorDepartment: '인사팀',
        isImportant: false,
        isPinned: false,
        viewCount: 342,
    },
];

export async function seedNotices() {
    try {
        console.log('🌱 공지사항 시드 시작...');

        // 기존 데이터 삭제 (개발 환경에서만)
        await db.delete(boardPosts).where(eq(boardPosts.category, 'notice'));
        console.log('기존 데이터 삭제 완료');

        // 샘플 데이터 삽입
        for (const notice of sampleNotices) {
            // 유효한 UUID 생성
            const authorId = crypto.randomUUID();

            await db.insert(boardPosts).values({
                ...notice,
                category: 'notice',
                authorId: authorId, // 유효한 UUID 사용
            });
            console.log(`✅ 추가됨: ${notice.title}`);
        }

        console.log(`\n✅ 총 ${sampleNotices.length}개의 공지사항 생성 완료!`);

        // 확인 쿼리
        const allNotices = await db.select().from(boardPosts).where(eq(boardPosts.category, 'notice'));
        console.log(`\n📊 DB 확인: 현재 ${allNotices.length}개의 공지사항이 있습니다.`);

    } catch (error) {
        console.error('❌ 시드 데이터 생성 실패:', error);
    }
}

// 파일이 직접 실행될 때만 실행
if (require.main === module) {
    seedNotices()
        .then(() => {
            console.log('✨ 완료!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 에러:', error);
            process.exit(1);
        });
}