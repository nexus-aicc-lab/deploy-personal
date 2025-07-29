import React from 'react'
import Image from 'next/image'

interface Props { }

const ManualPage = (props: Props) => {
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white">
            {/* 헤더 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Panel Mode 사용 설명서</h1>
                <p className="text-gray-600">UCTI Personal 시스템의 Panel Mode 기능에 대한 상세 가이드입니다.</p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                        <strong>Repository:</strong>
                        <a href="https://github.com/nexus-aicc-lab/tauri-cti-task-manager.git"
                            className="text-blue-600 hover:underline ml-2">
                            nexus-aicc-lab/tauri-cti-task-manager
                        </a>
                    </p>
                </div>
            </div>

            {/* 개요 섹션 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">개요</h2>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Panel Mode는 상담원이 효율적으로 고객 상담을 진행할 수 있도록 설계된 통합 대시보드입니다.
                        실시간 상담 상태 모니터링, 통화 관리, 그리고 각종 상담 통계를 한눈에 확인할 수 있습니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        화면은 <strong>헤더</strong>, <strong>왼쪽 제어 패널</strong>, <strong>중앙 상태 박스</strong>,
                        <strong>우측 정보 패널</strong>, <strong>하단 통계</strong> 등 5개 주요 영역으로 구성되어 있습니다.
                    </p>
                </div>
            </section>

            {/* 1. 헤더 영역 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. 헤더 영역</h2>
                <div className="bg-white border rounded-lg p-4 mb-6">
                    <Image
                        src="/menual/panel_mode0.png"
                        alt="Panel Mode 헤더 영역"
                        width={800}
                        height={450}
                        className="w-full h-auto rounded-lg shadow-md object-contain"
                    />
                </div>
                <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">주요 구성 요소</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-cyan-600 mb-2">좌측 메뉴</h4>
                            <p className="text-sm text-gray-600">햄버거 메뉴를 통한 시스템 메뉴 접근</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-cyan-600 mb-2">상담원 정보</h4>
                            <p className="text-sm text-gray-600">박소연(NEX1011) - 현재 로그인된 상담원 정보</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-cyan-600 mb-2">우측 제어버튼</h4>
                            <p className="text-sm text-gray-600">설정, 최소화, 전체화면, 닫기 등 시스템 제어</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. 왼쪽 제어 패널 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. 왼쪽 제어 패널</h2>
                <div className="bg-white border rounded-lg p-4 mb-6">
                    <Image
                        src="/menual/panel_mode1.png"
                        alt="Panel Mode 왼쪽 제어 패널"
                        width={800}
                        height={450}
                        className="w-full h-auto rounded-lg shadow-md object-contain"
                    />
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">구성 요소</h3>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-600 mb-2">현재 상태 표시 (원형 차트)</h4>
                            <p className="text-gray-700 mb-2">중앙의 큰 원형 차트는 현재 상담원의 상태를 시각적으로 표시합니다.</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• <strong>대기 (12:03:45)</strong>: 현재 대기 상태 및 누적 시간</li>
                                <li>• 실시간으로 상태 시간이 업데이트됩니다</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-600 mb-2">제어 버튼</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="font-medium text-gray-800">대기호</p>
                                    <p className="text-xl font-bold text-red-600">0</p>
                                    <p className="text-xs text-gray-600">현재 대기 중인 호 수</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="font-medium text-gray-800">대기 상담</p>
                                    <p className="text-xl font-bold text-red-600">0</p>
                                    <p className="text-xs text-gray-600">상담 대기 고객 수</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. 중앙 상태 박스 영역 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. 중앙 상태 박스 영역</h2>
                <div className="bg-white border rounded-lg p-4 mb-6">
                    <Image
                        src="/menual/panel_mode2.png"
                        alt="Panel Mode 중앙 상태 박스"
                        width={800}
                        height={450}
                        className="w-full h-auto rounded-lg shadow-md object-contain"
                    />
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">4가지 상담 상태</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400">
                            <h4 className="font-semibold text-blue-600 mb-2">📞 대기 (12:00:34)</h4>
                            <p className="text-sm text-gray-700 mb-1"><span className="font-medium">상태:</span> 호 대기 중</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">건수:</span> (15)건 처리</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-l-4 border-teal-400">
                            <h4 className="font-semibold text-teal-600 mb-2">📞 통화 (12:50:20)</h4>
                            <p className="text-sm text-gray-700 mb-1"><span className="font-medium">상태:</span> 고객과 통화 중</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">건수:</span> (12)건 처리</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400">
                            <h4 className="font-semibold text-orange-600 mb-2">✏️ 후처리 (00:34:20)</h4>
                            <p className="text-sm text-gray-700 mb-1"><span className="font-medium">상태:</span> 통화 후 업무 처리</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">건수:</span> (15)건 처리</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400">
                            <h4 className="font-semibold text-purple-600 mb-2">☕ 휴식 (00:00:00)</h4>
                            <p className="text-sm text-gray-700 mb-1"><span className="font-medium">상태:</span> 휴식 시간</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">건수:</span> (0)건</p>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <strong>💡 팁:</strong> 각 상태 박스를 클릭하여 상태를 전환할 수 있습니다.
                            시간과 처리 건수가 실시간으로 업데이트됩니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. 우측 정보 패널 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. 우측 정보 패널</h2>
                <div className="bg-white border rounded-lg p-4 mb-6">
                    <Image
                        src="/menual/panel_mode3.png"
                        alt="Panel Mode 우측 정보 패널"
                        width={800}
                        height={450}
                        className="w-full h-auto rounded-lg shadow-md object-contain"
                    />
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">통화 통계 정보</h3>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-green-600 mb-3">📞 인바운드 (수신 호)</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">개인:</span>
                                    <span className="font-medium text-pink-600">03:12:44(15)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">그룹:</span>
                                    <span className="font-medium text-teal-600">01:10:44(1)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">팀:</span>
                                    <span className="font-medium text-blue-600">04:10:44(1)</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-green-600 mb-3">📱 아웃바운드 (발신 호)</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">개인:</span>
                                    <span className="font-medium text-pink-600">03:12:44(15)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">그룹:</span>
                                    <span className="font-medium text-teal-600">01:10:44(1)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">팀:</span>
                                    <span className="font-medium text-blue-600">04:10:44(1)</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-lg">
                            <p className="text-sm text-gray-700">
                                <strong>형식:</strong> 시간(건수) - 예: 03:12:44(15) = 3시간 12분 44초, 15건 처리
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. 하단 통계 영역 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. 하단 통계 영역</h2>
                <div className="bg-white border rounded-lg p-4 mb-6">
                    <Image
                        src="/menual/panel_mode4.png"
                        alt="Panel Mode 하단 통계"
                        width={800}
                        height={450}
                        className="w-full h-auto rounded-lg shadow-md object-contain"
                    />
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">실시간 운영 통계</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-600 mb-2">📊 기본 통계</h4>
                            <ul className="space-y-1 text-sm">
                                <li><span className="text-gray-600">실인입좌수:</span> <strong className="text-blue-600">82%</strong></li>
                                <li><span className="text-gray-600">포기좌수:</span> <strong className="text-red-600">8</strong></li>
                                <li><span className="text-gray-600">보서비스수:</span> <strong className="text-green-600">0</strong></li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-orange-600 mb-2">📈 처리 통계</h4>
                            <ul className="space-y-1 text-sm">
                                <li><span className="text-gray-600">그룹순환표고기:</span> <strong className="text-orange-600">2</strong></li>
                                <li><span className="text-gray-600">실패좌수:</span> <strong className="text-red-600">1</strong></li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-600 mb-2">👥 그룹 통계</h4>
                            <ul className="space-y-1 text-sm">
                                <li><span className="text-gray-600">클론전환 인입:</span> <strong className="text-purple-600">4</strong></li>
                                <li><span className="text-gray-600">그룹전환 큐전환:</span> <strong className="text-teal-600">7</strong></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <strong>📌 참고:</strong> 모든 통계는 실시간으로 업데이트되며, 상담원의 업무 효율성 모니터링에 활용됩니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 사용 가이드 */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">사용 가이드</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-700 mb-3">✅ 추천 사용법</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• 상태 전환은 중앙 박스를 클릭하여 수행</li>
                            <li>• 후처리 시간은 최소한으로 유지</li>
                            <li>• 휴식 상태 후 즉시 대기 상태로 복귀</li>
                            <li>• 실시간 통계를 주기적으로 확인</li>
                        </ul>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-yellow-700 mb-3">⚠️ 주의사항</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• 대기 상태에서만 호가 분배됨</li>
                            <li>• 통화 중 상태 변경 불가</li>
                            <li>• 과도한 휴식 시간 지양</li>
                            <li>• 시스템 오류 시 즉시 관리자 연락</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 푸터 */}
            <footer className="border-t pt-6 text-center text-gray-500">
                <p className="font-medium">UCTI Personal v2.0 | Panel Mode 사용 설명서</p>
                <p className="text-sm mt-2">
                    Repository:
                    <a href="https://github.com/nexus-aicc-lab/tauri-cti-task-manager.git"
                        className="text-blue-600 hover:underline ml-1">
                        nexus-aicc-lab/tauri-cti-task-manager
                    </a>
                </p>
                <p className="text-sm mt-1">더 자세한 정보가 필요하시면 시스템 관리자에게 문의하세요.</p>
            </footer>
        </div>
    )
}

export default ManualPage