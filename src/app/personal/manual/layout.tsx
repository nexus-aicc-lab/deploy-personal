import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/shared/ui/Footer";
import Providers from "../providers";
import Header from "../../../../widgets/header";
import SidebarForManual from "./ui/SideBarForManual";

// Google 폰트
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Dashboard - Deploy Personal",
    description: "대시보드 페이지",
};

export default function ManualLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${inter.variable} ${inter.className} antialiased`}>
            <Providers>
                <div className="flex flex-col min-h-screen">
                    {/* 헤더 */}
                    {/* <Header /> */}

                    {/* 사이드바 + 본문 */}
                    <div className="flex flex-1">
                        <SidebarForManual /> {/* ✅ children 없음 */}

                        <main className="flex-1 p-6 overflow-auto">
                            {children} {/* ✅ 여기에서만 본문 출력 */}
                        </main>
                    </div>

                    {/* 푸터 */}
                    {/* <Footer /> */}
                </div>
            </Providers>
        </div>
    );
}
