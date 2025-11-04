import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Romang AI - AI 캐릭터 기반 로맨스 판타지 플랫폼",
    template: "%s | Romang AI",
  },
  description: "AI 캐릭터와 함께하는 로맨스 판타지 스토리를 경험하세요. 다양한 캐릭터와 카테고리, 태그로 나만의 이야기를 만나보세요.",
  keywords: ["AI 캐릭터", "로맨스 판타지", "인터랙티브 스토리", "AI 이야기"],
  authors: [{ name: "Romang AI" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://romang.ai",
    siteName: "Romang AI",
    title: "Romang AI - AI 캐릭터 기반 로맨스 판타지 플랫폼",
    description: "AI 캐릭터와 함께하는 로맨스 판타지 스토리를 경험하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Romang AI - AI 캐릭터 기반 로맨스 판타지 플랫폼",
    description: "AI 캐릭터와 함께하는 로맨스 판타지 스토리를 경험하세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
