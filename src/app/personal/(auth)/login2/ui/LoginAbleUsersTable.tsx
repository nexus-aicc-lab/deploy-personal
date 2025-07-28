'use client';

import React from 'react';

interface Props {
    onSelectUser: (email: string, password: string) => void;
}

const sampleUsers = [
    { name: '유상무', email: 'ucti1@nexus.co.kr' },
    { name: '박소연', email: 'ucti2@nexus.co.kr' },
    { name: '홍성래', email: 'ucti3@nexus.co.kr' },
    { name: '유초원', email: 'ucti4@nexus.co.kr' },
    { name: '임지선', email: 'ucti5@nexus.co.kr' },
    { name: '이승용', email: 'ucti6@nexus.co.kr' },
    { name: '이정수', email: 'ucti7@nexus.co.kr' },
    { name: '전영희', email: 'ucti8@nexus.co.kr' },
    { name: '관리자', email: 'admin@nexus.co.kr' },
];

const DEFAULT_PASSWORD = 'nexus!234';

const LoginAbleUsersTable: React.FC<Props> = ({ onSelectUser }) => {
    return (
        <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">🧪 테스트용 로그인 계정 (클릭 시 자동 입력)</h3>
            <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left">이름</th>
                        <th className="border px-4 py-2 text-left">이메일</th>
                        <th className="border px-4 py-2 text-left">비밀번호</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleUsers.map((user) => (
                        <tr
                            key={user.email}
                            className="cursor-pointer hover:bg-blue-50 transition"
                            onClick={() => onSelectUser(user.email, DEFAULT_PASSWORD)}
                        >
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{DEFAULT_PASSWORD}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoginAbleUsersTable;
