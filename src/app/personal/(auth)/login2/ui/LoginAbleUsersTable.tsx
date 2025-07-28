'use client';

import React from 'react';
import styles from './LoginAbleUsersTable.module.css';

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
        <div className={styles.container}>
            <h2 className={styles.title}>💼 사용 가능한 계정 목록</h2>
            <table className={styles.table}>
                <thead className={styles.tableHeader}>
                    <tr>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>비밀번호</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleUsers.map((user) => (
                        <tr
                            key={user.email}
                            className={styles.tableRow}
                            onClick={() => onSelectUser(user.email, DEFAULT_PASSWORD)}
                        >
                            <td className={styles.tableCell}>{user.name}</td>
                            <td className={styles.tableCell}>{user.email}</td>
                            <td className={styles.tableCell}>{DEFAULT_PASSWORD}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoginAbleUsersTable;
