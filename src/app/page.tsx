'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';

export default function HomePage() {
  return (
    <div className="pt-10 px-6 md:px-12 lg:px-24 space-y-2">
      {/* Hero */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          CTI <span className="text-blue-600"> Personal</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
          콜센터 상담사들의 실시간 상담 현황 및 실적을 한눈에 볼 수 있는 모던 웹앱
        </p>
      </section>

      {/* Dashboard + Actions */}
      <section className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
        {/* Left: Dashboard image */}
        <div className="w-full lg:w-2/3">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-200">
            <Image
              src="/sample.png"
              alt="콜센터 상담사 현황 대시보드"
              fill
              className="object-contain bg-gray-50"
              priority
            />
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">빠른 시작</h3>
            <p className="text-gray-600">
              문서를 확인하거나 바로 설치 파일을 다운로드하여 시작하세요.
            </p>
          </div>

          <div className="space-y-4">
            {/* 문서 보기 버튼 */}
            <Button asChild size="lg" className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
              <Link href="/manual" className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                📖 문서 보기
              </Link>
            </Button>

            {/* 다운로드 버튼 - 더 산뜻하게! */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full h-14 text-base font-semibold border-2 border-emerald-200 text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] group"
            >
              <Link href="/CTI Task Master_07151050.zip" download className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                💾 설치 파일 다운로드
                <span className="ml-2 px-2 py-1 bg-emerald-200 text-emerald-800 text-xs rounded-full font-medium">
                  ZIP
                </span>
              </Link>
            </Button>

            {/* 추가: 빠른 실행 버튼 */}
            <div className="pt-2">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <Link href="/demo" className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  🚀 온라인 데모 체험하기
                </Link>
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>온라인</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>실시간 업데이트</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>무료</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 pt-16">
        <div className="text-center space-y-4 p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">⚡ 실시간 모니터링</h3>
          <p className="text-gray-600 text-sm">상담사들의 현재 상태와 실적을 실시간으로 확인하세요.</p>
        </div>

        <div className="text-center space-y-4 p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-green-200 transition-all duration-200 group">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">📊 성과 분석</h3>
          <p className="text-gray-600 text-sm">상세한 통계와 차트로 팀 성과를 한눈에 파악하세요.</p>
        </div>

        <div className="text-center space-y-4 p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-purple-200 transition-all duration-200 group">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">📱 모바일 지원</h3>
          <p className="text-gray-600 text-sm">언제 어디서나 모바일로 팀 현황을 확인할 수 있습니다.</p>
        </div>
      </section>
    </div>
  );
}