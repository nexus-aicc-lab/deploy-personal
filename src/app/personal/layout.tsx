import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/shared/ui/Footer";
import Header from "../../../widgets/header";

// Google 폰트 설정
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // 폰트 로딩 최적화
  variable: "--font-inter", // CSS 변수로 사용할 수 있게 설정
});

export const metadata: Metadata = {
  title: "Deploy Personal",
  description: "Tauri + Next.js + Drizzle 기반 프로젝트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            {/* <Footer /> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}