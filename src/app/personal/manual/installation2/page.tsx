import React from 'react'
import Image from 'next/image'

interface Props { }

const InstallForUctiPersonal = (props: Props) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            {/* 헤더 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">UCTI Personal (Tauri) 설치 가이드</h1>
                <p className="text-gray-600">Tauri 기반의 UCTI Personal 데스크톱 애플리케이션 설치 및 개발 가이드입니다.</p>
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                        <strong>Repository:</strong>
                        <a href="https://github.com/nexus-aicc-lab/tauri-cti-task-manager.git"
                            className="text-purple-600 hover:underline ml-2">
                            nexus-aicc-lab/tauri-cti-task-manager
                        </a>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        <strong>기술 스택:</strong> Tauri, React, TypeScript, Vite, Rust
                    </p>
                </div>
            </div>

            {/* 시스템 요구사항 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">시스템 요구사항</h2>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3">필수 소프트웨어</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>• <strong>Rust:</strong> 1.70.0 이상</li>
                                <li>• <strong>Node.js:</strong> v18.0.0 이상</li>
                                <li>• <strong>npm/yarn:</strong> 최신 버전</li>
                                <li>• <strong>Git:</strong> 최신 버전</li>
                                <li>• <strong>Visual Studio Build Tools</strong> (Windows)</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3">시스템 사양</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>• <strong>OS:</strong> Windows 10/11, macOS 10.15+, Linux</li>
                                <li>• <strong>RAM:</strong> 8GB 이상 (16GB 권장)</li>
                                <li>• <strong>디스크:</strong> 10GB 이상 여유공간</li>
                                <li>• <strong>CPU:</strong> 4코어 이상 권장</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 사전 준비 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">사전 준비</h2>

                {/* Rust 설치 */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-orange-600 mb-3">1. Rust 개발 환경 설치</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                        <div className="mb-2"># Windows에서 Rust 설치</div>
                        <div className="text-yellow-300"># https://rustup.rs/ 에서 rustup-init.exe 다운로드 후 실행</div>
                        <div className="mb-4">rustup-init.exe</div>

                        <div className="mb-2"># macOS/Linux에서 Rust 설치</div>
                        <div className="text-yellow-300">curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh</div>
                        <div className="mb-4">source ~/.cargo/env</div>

                        <div className="mb-2"># 설치 확인</div>
                        <div className="text-cyan-300">rustc --version</div>
                        <div className="text-cyan-300">cargo --version</div>
                    </div>
                </div>

                {/* Windows 추가 설정 */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-red-600 mb-3">2. Windows 추가 설정</h3>
                    <div className="bg-red-50 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold text-red-700 mb-2">Visual Studio Build Tools 설치</h4>
                        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
                            <div># Microsoft Visual Studio Installer에서 설치</div>
                            <div className="text-yellow-300"># - Desktop development with C++</div>
                            <div className="text-yellow-300"># - Windows 10/11 SDK</div>
                            <div className="text-yellow-300"># - CMake tools</div>
                        </div>
                        <p className="text-sm text-gray-700">
                            또는 <a href="https://visualstudio.microsoft.com/visual-cpp-build-tools/"
                                className="text-red-600 hover:underline">
                                Build Tools for Visual Studio
                            </a>만 설치해도 됩니다.
                        </p>
                    </div>
                </div>

                {/* WebView2 설치 */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-blue-600 mb-3">3. WebView2 Runtime 설치</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
                            <div># Windows에서 자동으로 설치되지만, 수동 설치도 가능</div>
                            <div className="text-yellow-300"># Microsoft Edge WebView2 Runtime 다운로드</div>
                            <div># https://developer.microsoft.com/microsoft-edge/webview2/</div>
                        </div>
                        <p className="text-sm text-gray-700">
                            최신 Windows에는 이미 설치되어 있으며, Tauri가 자동으로 감지합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* MobaXterm 설정 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">개발 환경 설정</h2>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-teal-600 mb-3">MobaXterm 터미널 환경</h3>
                    <div className="bg-white border rounded-lg p-4 mb-6">
                        <Image
                            src="/menual/ec2_setting.png"
                            alt="MobaXterm 터미널 화면"
                            width={800}
                            height={450}
                            className="w-full h-auto rounded-lg shadow-md object-contain"
                        />
                    </div>
                    <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-lg">
                        <h4 className="font-semibold text-teal-700 mb-3">MobaXterm 설정 가이드</h4>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p>• <strong>SSH 연결 설정:</strong> EC2 인스턴스나 원격 서버 접속용</p>
                            <p>• <strong>로컬 터미널:</strong> Windows에서 Linux 스타일 명령어 사용</p>
                            <p>• <strong>파일 전송:</strong> SFTP를 통한 파일 업로드/다운로드</p>
                            <p>• <strong>개발 도구:</strong> Git, Node.js, Rust 등 개발 도구 통합 환경</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 프로젝트 설치 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">프로젝트 설치</h2>

                {/* 1. 저장소 클론 */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-purple-600 mb-3">1. 저장소 클론</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                        <div className="mb-2"># 작업 디렉토리로 이동</div>
                        <div className="mb-2">cd C:\tauri\cti-task-pilot2</div>
                        <div className="mb-4"># 또는 원하는 경로</div>

                        <div className="mb-2"># Git 저장소 클론</div>
                        <div className="text-yellow-300">git clone https://github.com/nexus-aicc-lab/tauri-cti-task-manager.git</div>
                        <div className="mb-4">cd tauri-cti-task-manager</div>

                        <div className="mb-2"># 브랜치 확인</div>
                        <div className="text-cyan-300">git branch -a</div>
                        <div className="text-cyan-300">git remote -v</div>
                    </div>
                </div>

                {/* 2. 의존성 설치 */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-green-600 mb-3">2. 프론트엔드 의존성 설치</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                        <div className="mb-2"># package.json 확인</div>
                        <div className="mb-4">cat package.json</div>

                        <div className="mb-2"># npm을 사용한 의존성 설치</div>
                        <div className="text-yellow-300">npm install</div>
                        <div className="mb-4"># 또는 yarn install</div>

                        <div className="mb-2"># Tauri CLI 글로벌 설치 (선택사항)</div>
                        <div className="text-cyan-300">npm install -g @tauri-apps/cli</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <strong>📦 주요 의존성:</strong> React, TypeScript, Vite, Tauri API, Radix UI, TanStack Router 등
                        </p>
                    </div>
                </div>

                {/* 3. Rust 의존성 빌드 */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-orange-600 mb-3">3. Rust 의존성 빌드</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                        <div className="mb-2"># Tauri 디렉토리 확인</div>
                        <div className="mb-4">ls src-tauri/</div>

                        <div className="mb-2"># Rust 의존성 확인 및 빌드 (첫 실행 시 자동)</div>
                        <div className="text-yellow-300">cd src-tauri</div>
                        <div className="text-yellow-300">cargo check</div>
                        <div className="mb-4">cd ..</div>

                        <div className="mb-2"># 또는 Tauri 개발 모드로 바로 실행</div>
                        <div className="text-cyan-300">npm run tauri dev</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <strong>⏱️ 첫 빌드:</strong> Rust 의존성 컴파일에 10-30분이 소요될 수 있습니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 개발 실행 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">개발 모드 실행</h2>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-indigo-600 mb-3">개발 서버 시작</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                        <div className="mb-2"># Tauri 개발 모드 실행</div>
                        <div className="text-yellow-300">npm run tauri dev</div>
                        <div className="mb-4"># 또는 yarn tauri dev</div>

                        <div className="mb-2"># 별도 터미널에서 프론트엔드만 실행</div>
                        <div className="text-cyan-300">npm run dev</div>

                        <div className="mb-2"># 성공 시 데스크톱 앱이 자동으로 실행됩니다</div>
                        <div className="text-green-300">✓ Webview window created successfully!</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-indigo-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-indigo-700 mb-2">🚀 실행 과정</h4>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>1. Vite 개발 서버 시작</li>
                                <li>2. Rust 백엔드 컴파일</li>
                                <li>3. Tauri 윈도우 생성</li>
                                <li>4. Hot reload 활성화</li>
                            </ul>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-yellow-700 mb-2">⚡ Hot Reload</h4>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>• React 코드 변경 시 즉시 반영</li>
                                <li>• Rust 코드 변경 시 재컴파일</li>
                                <li>• CSS/스타일 변경 실시간 적용</li>
                                <li>• 디버그 도구 사용 가능</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 빌드 및 배포 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">빌드 및 배포</h2>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-red-600 mb-3">프로덕션 빌드</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                        <div className="mb-2"># 프로덕션 빌드 실행</div>
                        <div className="text-yellow-300">npm run tauri build</div>
                        <div className="mb-4"># 또는 yarn tauri build</div>

                        <div className="mb-2"># 빌드 결과물 확인</div>
                        <div className="text-cyan-300">ls src-tauri/target/release/bundle/</div>
                        <div className="mb-4"># Windows: .msi, .exe</div>
                        <div className="mb-4"># macOS: .dmg, .app</div>
                        <div className="mb-4"># Linux: .deb, .rpm, .AppImage</div>

                        <div className="mb-2"># 설치 파일 위치</div>
                        <div className="text-green-300">src-tauri/target/release/bundle/msi/</div>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
                        <h4 className="font-semibold text-red-700 mb-3">빌드 설정 (tauri.conf.json)</h4>
                        <div className="bg-gray-800 text-gray-300 p-3 rounded font-mono text-xs mb-3">
                            <div className="text-green-400">{`{`}</div>
                            <div className="ml-2 text-green-400">"productName": "UCTI Personal",</div>
                            <div className="ml-2 text-green-400">"version": "0.1.0",</div>
                            <div className="ml-2 text-green-400">"identifier": "com.nexus.ucti.personal",</div>
                            <div className="ml-2 text-green-400">"bundle": {`{`}</div>
                            <div className="ml-4 text-green-400">"windows": {`{`}</div>
                            <div className="ml-6 text-green-400">"certificateThumbprint": null,</div>
                            <div className="ml-6 text-green-400">"digestAlgorithm": "sha256"</div>
                            <div className="ml-4 text-green-400">{`}`}</div>
                            <div className="ml-2 text-green-400">{`}`}</div>
                            <div className="text-green-400">{`}`}</div>
                        </div>
                        <p className="text-sm text-gray-700">
                            앱 이름, 버전, 번들 ID 등을 프로젝트에 맞게 수정하세요.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">📦 배포 패키지</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• <strong>Windows:</strong> .msi, .exe 설치 파일</li>
                            <li>• <strong>macOS:</strong> .dmg, .app 번들</li>
                            <li>• <strong>Linux:</strong> .deb, .rpm, .AppImage</li>
                            <li>• <strong>Portable:</strong> 설치 없이 실행 가능</li>
                        </ul>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">🔐 코드 서명</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• <strong>Windows:</strong> Authenticode 인증서</li>
                            <li>• <strong>macOS:</strong> Apple Developer ID</li>
                            <li>• <strong>자동 업데이트:</strong> Tauri Updater 플러그인</li>
                            <li>• <strong>배포:</strong> GitHub Releases 연동</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 트러블슈팅 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">트러블슈팅</h2>
                <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">❌ Rust 컴파일 오류</h4>
                        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-2">
                            <div># Rust 툴체인 업데이트</div>
                            <div className="text-yellow-300">rustup update</div>
                            <div># 캐시 정리</div>
                            <div className="text-yellow-300">cargo clean</div>
                        </div>
                        <p className="text-sm text-gray-700">Rust 버전이나 타겟이 맞지 않을 때 발생합니다.</p>
                    </div>

                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">❌ WebView2 관련 오류</h4>
                        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-2">
                            <div># Windows에서 WebView2 Runtime 수동 설치</div>
                            <div className="text-yellow-300"># Microsoft 사이트에서 다운로드</div>
                            <div># 또는 개발자 모드로 우회</div>
                            <div className="text-yellow-300">npm run tauri dev -- --features devtools</div>
                        </div>
                        <p className="text-sm text-gray-700">Windows에서 WebView2가 없을 때 발생합니다.</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">❌ 권한 관련 오류</h4>
                        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-2">
                            <div># 관리자 권한으로 실행</div>
                            <div className="text-yellow-300"># PowerShell을 관리자로 실행 후</div>
                            <div className="text-yellow-300">npm run tauri dev</div>
                        </div>
                        <p className="text-sm text-gray-700">Windows에서 파일 시스템 접근이나 네트워크 권한이 필요할 때</p>
                    </div>

                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">❌ 빌드 크기 최적화</h4>
                        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-2">
                            <div># release 프로파일 최적화</div>
                            <div className="text-yellow-300"># Cargo.toml에서 설정</div>
                            <div className="text-yellow-300">[profile.release]</div>
                            <div className="text-yellow-300">opt-level = "z"</div>
                            <div className="text-yellow-300">lto = true</div>
                        </div>
                        <p className="text-sm text-gray-700">실행 파일 크기를 줄이고 성능을 최적화합니다.</p>
                    </div>
                </div>
            </section>

            {/* 개발 도구 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">개발 도구 및 리소스</h2>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-3">🛠️ 개발 도구</h4>
                            <ul className="space-y-1 text-sm">
                                <li><a href="https://tauri.app/" className="text-purple-600 hover:underline">Tauri 공식 사이트</a></li>
                                <li><a href="https://vitejs.dev/" className="text-purple-600 hover:underline">Vite 빌드 도구</a></li>
                                <li><a href="https://react.dev/" className="text-purple-600 hover:underline">React 문서</a></li>
                                <li><a href="https://www.rust-lang.org/" className="text-purple-600 hover:underline">Rust 언어</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-3">📚 추가 리소스</h4>
                            <ul className="space-y-1 text-sm">
                                <li><a href="https://tauri.app/v1/guides/" className="text-purple-600 hover:underline">Tauri 가이드</a></li>
                                <li><a href="https://docs.rs/" className="text-purple-600 hover:underline">Rust 문서</a></li>
                                <li><a href="https://code.visualstudio.com/" className="text-purple-600 hover:underline">VS Code + Rust Analyzer</a></li>
                                <li><a href="https://github.com/tauri-apps/awesome-tauri" className="text-purple-600 hover:underline">Awesome Tauri</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 푸터 */}
            <footer className="border-t pt-6 text-center text-gray-500">
                <p className="font-medium">UCTI Personal - Tauri 애플리케이션 설치 가이드</p>
                <p className="text-sm mt-2">
                    Repository:
                    <a href="https://github.com/nexus-aicc-lab/tauri-cti-task-manager.git"
                        className="text-purple-600 hover:underline ml-1">
                        nexus-aicc-lab/tauri-cti-task-manager
                    </a>
                </p>
                <p className="text-sm mt-1">기술 지원이 필요하면 개발팀에 문의하세요.</p>
            </footer>
        </div>
    )
}

export default InstallForUctiPersonal