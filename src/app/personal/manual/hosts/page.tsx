import React from 'react'

interface Props { }

const HostsInfo = (props: Props) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            {/* 헤더 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">사내 내부망 설정 가이드</h1>
                <p className="text-gray-600">Windows hosts 파일에 사내 서버 정보 추가하는 간단한 방법입니다.</p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                        💡 <strong>요약:</strong> hosts 파일을 열고 → 아래 내용 복사 → 붙여넣기 → 저장
                    </p>
                </div>
            </div>

            {/* 빠른 설정 방법 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">빠른 설정 (3단계)</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div className="text-2xl mb-2">1️⃣</div>
                        <h3 className="font-semibold text-red-700">파일 열기</h3>
                        <p className="text-sm text-gray-600 mt-1">관리자 권한으로 hosts 파일 열기</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl mb-2">2️⃣</div>
                        <h3 className="font-semibold text-green-700">내용 추가</h3>
                        <p className="text-sm text-gray-600 mt-1">아래 서버 목록 복사 후 붙여넣기</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl mb-2">3️⃣</div>
                        <h3 className="font-semibold text-blue-700">저장 완료</h3>
                        <p className="text-sm text-gray-600 mt-1">저장 후 DNS 캐시 새로고침</p>
                    </div>
                </div>
            </section>

            {/* 1단계: 파일 열기 */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-red-600 mb-3">1단계: hosts 파일 열기</h2>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                    <div className="mb-2"># Windows + R 키 누르고 아래 명령어 입력</div>
                    <div className="text-yellow-300">notepad C:\Windows\System32\drivers\etc\hosts</div>
                    <div className="mb-4"># 또는 PowerShell 관리자 권한으로 실행 후</div>
                    <div className="text-cyan-300">notepad C:\Windows\System32\drivers\etc\hosts</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">
                        ⚠️ <strong>권한 오류 시:</strong> 시작메뉴에서 "메모장" 우클릭 → "관리자 권한으로 실행" → 파일 열기
                    </p>
                </div>
            </section>

            {/* 2단계: 내용 추가 */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-green-600 mb-3">2단계: 아래 내용 복사해서 붙여넣기</h2>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                    <div className="text-gray-500"># === Nexus Community 사내 서버 설정 ===</div>
                    <div className="text-cyan-300">10.10.40.151 jedai-qa-web.nexuscommunity.net</div>
                    <div className="mb-2"></div>
                    <div className="text-yellow-300">61.97.146.232 pdsw232.nexuscommunity.kr</div>
                    <div className="text-yellow-300">61.97.146.228 pdsw228.nexuscommunity.kr</div>
                    <div className="mb-2"></div>
                    <div className="text-green-300">10.10.40.199  webdev-199.nexuscommunity.kr</div>
                    <div className="text-green-300">10.10.40.200  web1-200.nexuscommunity.kr</div>
                    <div className="text-green-300">10.10.40.201  web2-201.nexuscommunity.kr</div>
                    <div className="text-green-300">10.10.40.186  ucti186.nexuscommunity.kr</div>
                    <div className="mb-2"></div>
                    <div className="text-gray-500"># Docker Desktop</div>
                    <div className="text-purple-300">10.10.50.168 host.docker.internal</div>
                    <div className="text-purple-300">10.10.50.168 gateway.docker.internal</div>
                    <div className="text-purple-300">127.0.0.1 kubernetes.docker.internal</div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                    <p className="text-sm text-green-700">
                        ✅ <strong>붙여넣기 위치:</strong> hosts 파일의 맨 아래에 추가하세요. 기존 내용은 건드리지 마세요.
                    </p>
                </div>
            </section>

            {/* 3단계: 저장 및 완료 */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-3">3단계: 저장 및 적용</h2>
                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">💾 저장하기</h4>
                        <div className="bg-gray-800 text-green-300 p-3 rounded font-mono text-sm">
                            <div># 메모장에서</div>
                            <div className="text-yellow-300">Ctrl + S</div>
                            <div># 또는 파일 → 저장</div>
                        </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-700 mb-2">🔄 DNS 캐시 새로고침</h4>
                        <div className="bg-gray-800 text-green-300 p-3 rounded font-mono text-sm">
                            <div># PowerShell이나 CMD에서 실행</div>
                            <div className="text-yellow-300">ipconfig /flushdns</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 완료 확인 */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-purple-600 mb-3">✅ 설정 완료 확인</h2>
                <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-700 mb-3">
                        브라우저에서 아래 주소 중 하나로 접속해보세요:
                    </p>
                    <div className="bg-white p-3 rounded border space-y-1 font-mono text-sm">
                        <div>http://ucti186.nexuscommunity.kr</div>
                        <div>http://webdev-199.nexuscommunity.kr</div>
                        <div>http://jedai-qa-web.nexuscommunity.net</div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                        * 접속이 되면 설정 완료! 안 되면 VPN 연결 확인 또는 IT팀 문의
                    </p>
                </div>
            </section>

            {/* 간단 트러블슈팅 */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">🔧 문제 해결</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">파일이 저장 안 됨</h4>
                        <p className="text-sm text-gray-700">→ 메모장을 관리자 권한으로 다시 실행</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">사이트 접속 안 됨</h4>
                        <p className="text-sm text-gray-700">→ ipconfig /flushdns 실행 후 브라우저 재시작</p>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default HostsInfo