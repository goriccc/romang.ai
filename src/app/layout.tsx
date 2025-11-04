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
  description: "설렘, 낭만, 그리고 판타지. 로망은 당신이 원하는 모든 대화를 현실로 만듭니다. 생생한 AI 캐릭터와 함께하는 몰입형 채팅으로 오늘 당신의 로망이 시작됩니다. / Excitement, romance, and fantasy. Romang brings every conversation you desire to life. Experience immersive chat with vivid AI characters. Your romance begins today.",
  keywords: ["AI 캐릭터", "로맨스 판타지", "인터랙티브 스토리", "AI 이야기"],
  authors: [{ name: "Romang AI" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://romang.ai",
    siteName: "Romang AI",
    title: "Romang AI - AI 캐릭터 기반 로맨스 판타지 플랫폼",
    description: "설렘, 낭만, 그리고 판타지. 로망은 당신이 원하는 모든 대화를 현실로 만듭니다. 생생한 AI 캐릭터와 함께하는 몰입형 채팅으로 오늘 당신의 로망이 시작됩니다. / Excitement, romance, and fantasy. Romang brings every conversation you desire to life. Experience immersive chat with vivid AI characters. Your romance begins today.",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Romang AI - AI 캐릭터 기반 로맨스 판타지 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Romang AI - AI 캐릭터 기반 로맨스 판타지 플랫폼",
    description: "설렘, 낭만, 그리고 판타지. 로망은 당신이 원하는 모든 대화를 현실로 만듭니다. 생생한 AI 캐릭터와 함께하는 몰입형 채팅으로 오늘 당신의 로망이 시작됩니다. / Excitement, romance, and fantasy. Romang brings every conversation you desire to life. Experience immersive chat with vivid AI characters. Your romance begins today.",
    images: ["/og-home.jpg"],
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
