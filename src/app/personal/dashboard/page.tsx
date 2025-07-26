// C:\deploy-server\deploy-personal\src\app\page.tsx
'use client';

import { useEffect, useState } from 'react';
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

export default function HomePage() {
    const [latestRelease, setLatestRelease] = useState<GitHubRelease | null>(null);
    const [loading, setLoading] = useState(true);

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

        // .exe 파일 찾기 (설치 파일)
        const exeAsset = latestRelease.assets.find(asset =>
            asset.name.toLowerCase().endsWith('.exe') && asset.name.includes('setup')
        );

        // .msi 파일 찾기 (대체)
        const msiAsset = latestRelease.assets.find(asset =>
            asset.name.toLowerCase().endsWith('.msi')
        );

        return exeAsset?.browser_download_url || msiAsset?.browser_download_url || null;
    };

    const downloadUrl = getDownloadUrl();
    const version = latestRelease?.tag_name || '';

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 space-y-16">
            {/* Dashboard + Actions */}
            <section className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                {/* Dashboard 이미지 */}
                <div className="w-full lg:w-3/5 flex items-center justify-center">
                    <div className="rounded-xl overflow-hidden bg-white">
                        <Image
                            src="/personal/sample.png"
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
                        className="text-center space-y-4 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 group"
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
        </div>
    );
}