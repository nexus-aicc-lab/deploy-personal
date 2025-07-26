import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t">
            <div className="container mx-auto px-6 py-8">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* 회사 정보 */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ucti Personal</h3>
                    </div>

                    {/* 제품 */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">제품</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/features" className="text-gray-600 hover:text-gray-900">기능</Link></li>
                            <li><Link href="/pricing" className="text-gray-600 hover:text-gray-900">요금제</Link></li>
                            <li><Link href="/docs" className="text-gray-600 hover:text-gray-900">문서</Link></li>
                        </ul>
                    </div>

                    {/* 지원 */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">지원</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/help" className="text-gray-600 hover:text-gray-900">도움말</Link></li>
                            <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">문의하기</Link></li>
                            <li><Link href="/status" className="text-gray-600 hover:text-gray-900">서비스 상태</Link></li>
                        </ul>
                    </div>

                    {/* 회사 */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">회사</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-gray-600 hover:text-gray-900">회사 소개</Link></li>
                            <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">개인정보처리방침</Link></li>
                            <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">이용약관</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Deploy Personal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}