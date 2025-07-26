// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    console.log("현재 요청 경로:", pathname);

    // basePath가 /personal로 설정되어 있으므로
    // 실제로는 /personal이 루트가 됨
    if (pathname === '/') {
        console.log("현재 요청 경로가 루트('/')입니다. /login으로 리다이렉트합니다.");

        return NextResponse.redirect(new URL('/personal/login', request.url));
    }

    // /api로 시작하는 요청을 /personal/api로 리라이트 (기존 로직 유지)
    // if (pathname.startsWith('/api')) {
    //     const url = request.nextUrl.clone();
    //     url.pathname = '/personal' + url.pathname;
    //     return NextResponse.rewrite(url);
    // }
}

export const config = {
    matcher: ['/', '/api/:path*'],
};