import React from 'react'
import Image from 'next/image'

interface Props { }

const InstallForLauncherProject = (props: Props) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            {/* 헤더 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">론처 프로젝트 설치 가이드</h1>
                <p className="text-gray-600">UCTI Personal 시스템의 웹 기반 론처 페이지 설치 및 배포 가이드입니다.</p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                        <strong>Repository:</strong>
                        <a href="https://github.com/nexus-aicc-lab/deploy-personal.git"
                            className="text-blue-600 hover:underline ml-2">
                            nexus-aicc-lab/deploy-personal
                        </a>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        <strong>기술 스택:</strong> Next.js, React, TypeScript, Tailwind CSS
                    </p>
                </div>
            </div>

            {/* 시스템 요구사항 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">시스템 요구사항</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3">필수 소프트웨어</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>• <strong>Node.js:</strong> v18.0.0 이상</li>
                                <li>• <strong>npm:</strong> v8.0.0 이상 (또는 yarn, pnpm)</li>
                                <li>• <strong>Git:</strong> 최신 버전</li>
                                <li>• <strong>터미널:</strong> PowerShell, CMD, 또는 Git Bash</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3">권장 환경</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>• <strong>OS:</strong> Windows 10/11, macOS, Linux</li>
                                <li>• <strong>RAM:</strong> 8GB 이상</li>
                                <li>• <strong>디스크:</strong> 5GB 이상 여유공간</li>
                                <li>• <strong>IDE:</strong> VSCode (권장)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 설치 단계 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">설치 단계</h2>

                {/* 1. 저장소 클론 */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-blue-600 mb-3">1. 저장소 클론</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                        <div className="mb-2"># 원하는 디렉토리로 이동</div>
                        <div className="mb-2">cd C:\deploy-server</div>
                        <div className="mb-4"># 또는 cd /your/desired/path</div>

                        <div className="mb-2"># Git 저장소 클론</div>
                        <div className="text-yellow-300">git clone https://github.com/nexus-aicc-lab/deploy-personal.git</div>
                        <div className="mb-4">cd deploy-personal</div>

                        <div className="mb-2"># 저장소 정보 확인</div>
                        <div className="text-cyan-300">git remote -v</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <strong>💡 팁:</strong> 클론이 완료되면 <code className="bg-gray-200 px-2 py-1 rounded">deploy-personal</code> 폴더가 생성됩니다.
                        </p>
                    </div>
                </div>

                {/* 2. 의존성 설치 */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-green-600 mb-3">2. 의존성 설치</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                        <div className="mb-2"># 프로젝트 디렉토리 확인</div>
                        <div className="mb-4">pwd</div>

                        <div className="mb-2"># package.json 확인</div>
                        <div className="mb-4">cat package.json</div>

                        <div className="mb-2"># npm을 사용한 의존성 설치</div>
                        <div className="text-yellow-300">npm install</div>
                        <div className="mb-4"># 또는 yarn install</div>

                        <div className="mb-2"># 설치 완료 확인</div>
                        <div className="text-cyan-300">npm list --depth=0</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <strong>⏱️ 예상 시간:</strong> 2-5분 (인터넷 속도에 따라 달라집니다)
                        </p>
                    </div>
                </div>

                {/* 3. 환경 설정 */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-purple-600 mb-3">3. 환경 설정</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                        <div className="mb-2"># 환경 변수 파일 생성</div>
                        <div className="mb-4">cp .env.example .env.local</div>

                        <div className="mb-2"># Windows에서는</div>
                        <div className="text-yellow-300">copy .env.example .env.local</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-700 mb-2">환경 변수 설정</h4>
                        <div className="bg-gray-800 text-gray-300 p-3 rounded font-mono text-xs">
                            <div># .env.local 파일 내용</div>
                            <div className="text-green-400">NEXT_PUBLIC_API_URL=http://localhost:3000</div>
                            <div className="text-green-400">NEXT_PUBLIC_APP_NAME=UCTI Personal</div>
                            <div className="text-green-400">NODE_ENV=development</div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            필요에 따라 API URL 및 기타 설정을 수정하세요.
                        </p>
                    </div>
                </div>

                {/* 4. 개발 서버 실행 */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-indigo-600 mb-3">4. 개발 서버 실행</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                        <div className="mb-2"># 개발 서버 시작</div>
                        <div className="text-yellow-300">npm run dev</div>
                        <div className="mb-4"># 또는 yarn dev</div>

                        <div className="mb-2"># 서버가 시작되면 다음과 같은 메시지가 표시됩니다:</div>
                        <div className="text-cyan-300">▲ Next.js 14.x.x</div>
                        <div className="text-cyan-300">- Local: http://localhost:3000</div>
                        <div className="text-cyan-300">- Network: http://192.168.x.x:3000</div>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <strong>🌐 접속:</strong> 브라우저에서
                            <a href="http://localhost:3000" className="text-indigo-600 hover:underline mx-1">
                                http://localhost:3000
                            </a>
                            으로 접속하여 확인하세요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 프로덕션 배포 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">프로덕션 배포</h2>

                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-red-700 mb-3">빌드 및 배포</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                        <div className="mb-2"># 프로덕션 빌드</div>
                        <div className="text-yellow-300">npm run build</div>
                        <div className="mb-4"># 또는 yarn build</div>

                        <div className="mb-2"># 빌드 결과 확인</div>
                        <div className="text-cyan-300">npm run start</div>
                        <div className="mb-4"># 또는 yarn start</div>

                        <div className="mb-2"># PM2를 사용한 배포 (권장)</div>
                        <div className="text-yellow-300">npm install -g pm2</div>
                        <div className="text-yellow-300">pm2 start npm --name "ucti-launcher" -- start</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">🚀 배포 옵션</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• <strong>Vercel:</strong> 자동 배포 (권장)</li>
                            <li>• <strong>Netlify:</strong> JAMstack 배포</li>
                            <li>• <strong>Docker:</strong> 컨테이너 배포</li>
                            <li>• <strong>AWS EC2:</strong> 클라우드 서버 배포</li>
                        </ul>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">⚙️ 최적화 설정</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• <strong>이미지 최적화:</strong> next/image 사용</li>
                            <li>• <strong>코드 분할:</strong> 자동 지원</li>
                            <li>• <strong>캐싱:</strong> ISR 활용</li>
                            <li>• <strong>SEO:</strong> next/head 최적화</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 트러블슈팅 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">트러블슈팅</h2>
                <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">❌ 포트 이미 사용 중 오류</h4>
                        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-2">
                            <div># 다른 포트로 실행</div>
                            <div className="text-yellow-300">npm run dev -- -p 3001</div>
                        </div>
                        <p className="text-sm text-gray-700">3000번 포트가 사용 중일 때 다른 포트로 실행합니다.</p>
                    </div>

                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">❌ 의존성 충돌 오류</h4>
                        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-2">
                            <div># node_modules 삭제 후 재설치</div>
                            <div className="text-yellow-300">rm -rf node_modules package-lock.json</div>
                            <div className="text-yellow-300">npm install</div>
                        </div>
                        <p className="text-sm text-gray-700">Windows에서는 <code>rmdir /s node_modules</code> 사용</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">❌ 빌드 오류</h4>
                        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-2">
                            <div># TypeScript 타입 체크</div>
                            <div className="text-yellow-300">npm run type-check</div>
                            <div># ESLint 검사</div>
                            <div className="text-yellow-300">npm run lint</div>
                        </div>
                        <p className="text-sm text-gray-700">타입 오류나 린트 오류를 먼저 해결하세요.</p>
                    </div>
                </div>
            </section>

            {/* 추가 리소스 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">추가 리소스</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">📚 문서</h4>
                            <ul className="space-y-1 text-sm">
                                <li><a href="https://nextjs.org/docs" className="text-blue-600 hover:underline">Next.js 공식 문서</a></li>
                                <li><a href="https://tailwindcss.com/docs" className="text-blue-600 hover:underline">Tailwind CSS 문서</a></li>
                                <li><a href="https://react.dev/" className="text-blue-600 hover:underline">React 공식 문서</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">🛠️ 도구</h4>
                            <ul className="space-y-1 text-sm">
                                <li><a href="https://code.visualstudio.com/" className="text-blue-600 hover:underline">Visual Studio Code</a></li>
                                <li><a href="https://nodejs.org/" className="text-blue-600 hover:underline">Node.js 다운로드</a></li>
                                <li><a href="https://git-scm.com/" className="text-blue-600 hover:underline">Git 다운로드</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 푸터 */}
            <footer className="border-t pt-6 text-center text-gray-500">
                <p className="font-medium">UCTI Personal - 론처 프로젝트 설치 가이드</p>
                <p className="text-sm mt-2">
                    Repository:
                    <a href="https://github.com/nexus-aicc-lab/deploy-personal.git"
                        className="text-blue-600 hover:underline ml-1">
                        nexus-aicc-lab/deploy-personal
                    </a>
                </p>
                <p className="text-sm mt-1">문제가 발생하면 개발팀에 문의하세요.</p>
            </footer>
        </div>
    )
}

export default InstallForLauncherProject