// src/app/personal/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';

type GitHubRelease = {
    tag_name: string;
    name: string;
    assets: {
        name: string;
        browser_download_url: string;
    }[];
};

export default function DashboardPage() {
    const { user } = useAuthStore();
    const [latestRelease, setLatestRelease] = useState<GitHubRelease | null>(null);
    const [loading, setLoading] = useState(true);

    // GitHub 릴리즈 정보 가져오기
    useEffect(() => {
        const fetchLatestRelease = async () => {
            try {
                const response = await fetch(
                    'https://api.github.com/repos/nexus-aicc-lab/tauri-cti-task-manager/releases/latest'
                );
                if (response.ok) {
                    const data = await response.json();
                    setLatestRelease(data);
                }
            } catch (error) {
                console.error('Failed to fetch latest release:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestRelease();
    }, []);

    // 설치 파일 찾기 (exe 파일 우선)
    const getDownloadUrl = () => {
        if (!latestRelease) return null;

        const exeAsset = latestRelease.assets.find(asset =>
            asset.name.toLowerCase().endsWith('.exe') && asset.name.includes('setup')
        );

        const msiAsset = latestRelease.assets.find(asset =>
            asset.name.toLowerCase().endsWith('.msi')
        );

        return exeAsset?.browser_download_url || msiAsset?.browser_download_url || null;
    };

    const downloadUrl = getDownloadUrl();
    const version = latestRelease?.tag_name || '';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 메인 컨텐츠 */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 space-y-16">
                {/* 사용자 환영 메시지 (선택적) */}
                {user && (
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            안녕하세요, {user.name}님! 👋
                        </h1>
                        <p className="text-gray-600 mt-2">
                            콜센터 관리 시스템에 오신 것을 환영합니다.
                        </p>
                    </div>
                )}

                {/* Dashboard + Actions */}
                <section className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                    {/* Dashboard 이미지 */}
                    <div className="w-full lg:w-3/5 flex items-center justify-center">
                        <div className="rounded-xl overflow-hidden bg-white shadow-lg">
                            <Image
                                src="/sample.png"
                                alt="콜센터 상담사 현황 대시보드"
                                width={800}
                                height={450}
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Action 버튼 */}
                    <div className="w-full lg:w-2/5 flex flex-col justify-start gap-4">
                        <Button asChild size="lg" className="w-full h-14 text-base font-semibold">
                            <Link href="/document">📄 Document</Link>
                        </Button>

                        {loading ? (
                            <Button
                                variant="outline"
                                size="lg"
                                disabled
                                className="w-full h-14 text-base font-semibold border-2 border-gray-200"
                            >
                                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-transparent mr-2"></span>
                                Loading...
                            </Button>
                        ) : downloadUrl ? (
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="w-full h-14 text-base font-semibold border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            >
                                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                                    ⬇️ Download
                                    <span className="ml-2 px-2 py-1 bg-emerald-200 text-emerald-800 text-xs rounded-full font-medium">
                                        {version}
                                    </span>
                                </a>
                            </Button>
                        ) : (
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="w-full h-14 text-base font-semibold border-2 border-gray-200 text-gray-500"
                            >
                                <Link href="https://github.com/nexus-aicc-lab/tauri-cti-task-manager/releases">
                                    📦 View All Releases
                                </Link>
                            </Button>
                        )}

                        {/* 추가 정보 */}
                        {latestRelease && (
                            <div className="text-sm text-gray-600 text-center mt-2">
                                <p>최신 버전: <span className="font-semibold">{latestRelease.name || version}</span></p>
                                <Link
                                    href="https://github.com/nexus-aicc-lab/tauri-cti-task-manager/releases"
                                    className="text-emerald-600 hover:underline"
                                >
                                    모든 버전 보기 →
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* 기능 카드 영역 */}
                <section className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            iconBg: 'bg-blue-100 group-hover:bg-blue-200',
                            iconColor: 'text-blue-600',
                            title: '⚡ 실시간 모니터링',
                            desc: '상담사들의 현재 상태와 실적을 실시간으로 확인하세요.',
                        },
                        {
                            iconBg: 'bg-green-100 group-hover:bg-green-200',
                            iconColor: 'text-green-600',
                            title: '📊 성과 분석',
                            desc: '상세한 통계와 차트로 팀 성과를 한눈에 파악하세요.',
                        },
                        {
                            iconBg: 'bg-purple-100 group-hover:bg-purple-200',
                            iconColor: 'text-purple-600',
                            title: '📱 모바일 지원',
                            desc: '언제 어디서나 모바일로 팀 현황을 확인할 수 있습니다.',
                        },
                    ].map((card, idx) => (
                        <div
                            key={idx}
                            className="text-center space-y-4 p-6 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all duration-200 group"
                        >
                            <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto transition-colors ${card.iconBg}`}
                            >
                                <svg
                                    className={`w-6 h-6 ${card.iconColor}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold">{card.title}</h3>
                            <p className="text-gray-600 text-sm">{card.desc}</p>
                        </div>
                    ))}
                </section>

                {/* 사용자 통계 섹션 */}
                <section className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">사용자 통계</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 border rounded-lg">
                            <p className="text-3xl font-bold text-blue-600">0</p>
                            <p className="text-sm text-gray-600 mt-1">오늘 처리한 업무</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <p className="text-3xl font-bold text-green-600">0</p>
                            <p className="text-sm text-gray-600 mt-1">이번 주 완료</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <p className="text-3xl font-bold text-purple-600">0</p>
                            <p className="text-sm text-gray-600 mt-1">전체 업무</p>
                        </div>
                    </div>
                </section>

                {/* 로그아웃 버튼 (필요한 경우) */}
                <section className="text-center">
                    <Button asChild variant="outline" className="px-8">
                        <Link href="/personal/login2">
                            🚪 로그아웃
                        </Link>
                    </Button>
                </section>
            </div>
        </div>
    );
}