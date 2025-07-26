import type { Metadata } from "next";
import { Inter } from "next/font/google";
// globals.css는 루트 레이아웃에서 이미 import되므로 여기서는 제외
// import "./globals.css";
import Footer from "@/shared/ui/Footer";
import Providers from "../providers";
import Header from "../../../../widgets/header";

// Google 폰트 설정
const inter = Inter({
    subsets: ["latin"],
    display: "swap", // 폰트 로딩 최적화
    variable: "--font-inter", // CSS 변수로 사용할 수 있게 설정
});

export const metadata: Metadata = {
    title: "Dashboard - Deploy Personal",
    description: "대시보드 페이지",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${inter.variable} ${inter.className} antialiased`}>
            <Providers>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </div>
            </Providers>
        </div>
    );
}