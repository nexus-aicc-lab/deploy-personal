// 📄 C:\deploy-server\deploy-personal\src\app\document\page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

// 🔽 깃허브 릴리즈 타입 정의
type Release = {
    tag_name: string;
    name: string;
    html_url: string;
    created_at: string;
    assets: {
        name: string;
        browser_download_url: string;
    }[];
};

const ITEMS_PER_PAGE = 5;

export default function DocumentPage() {
    const [releases, setReleases] = useState<Release[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReleases = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api.github.com/repos/nexus-aicc-lab/tauri-cti-task-manager/releases');
                if (!response.ok) throw new Error('릴리즈 데이터를 불러올 수 없습니다.');
                const data = await response.json();
                setReleases(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, []);

    // 페이징 계산
    const totalPages = Math.ceil(releases.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentReleases = releases.slice(startIndex, endIndex);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        🚀 최신 릴리즈
                        {releases.length > 0 && (
                            <span className="text-sm font-normal text-muted-foreground">
                                (총 {releases.length}개)
                            </span>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                            <p className="mt-2 text-muted-foreground">릴리즈 정보를 불러오는 중...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-8 text-red-600">
                            <p>⚠️ {error}</p>
                        </div>
                    )}

                    {!loading && !error && releases.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>릴리즈가 없습니다.</p>
                        </div>
                    )}

                    {!loading && !error && currentReleases.length > 0 && (
                        <div className="space-y-4">
                            {currentReleases.map((release) => (
                                <div key={release.tag_name} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-lg">{release.name || release.tag_name}</h3>
                                                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                                                    {release.tag_name}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                📅 {formatDate(release.created_at)}
                                            </p>

                                            {release.assets.length > 0 && (
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium">다운로드:</p>
                                                    {release.assets.slice(0, 3).map((asset) => (
                                                        <a
                                                            key={asset.name}
                                                            href={asset.browser_download_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-block text-sm text-blue-600 hover:text-blue-800 underline mr-4"
                                                        >
                                                            ⬇️ {asset.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <a href={release.html_url} target="_blank" rel="noreferrer">
                                                상세보기
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 페이징 */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-6 pt-4 border-t">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                이전
                            </Button>

                            <span className="text-sm text-muted-foreground px-3">
                                {currentPage} / {totalPages}
                            </span>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                            >
                                다음
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}
