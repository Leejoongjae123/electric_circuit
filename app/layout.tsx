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
  title: "전기 회로 시뮬레이터 | Electric Circuit Simulator",
  description: "저항, 커패시터, 인덕터 등 다양한 전기 소자를 활용하여 회로를 설계하고 시뮬레이션할 수 있는 웹 기반 전기 회로 시뮬레이터입니다.",
  keywords: ["전기 회로", "회로 시뮬레이터", "electric circuit", "circuit simulator", "resistor", "capacitor", "inductor"],
  authors: [{ name: "Electric Circuit Team" }],
  openGraph: {
    title: "전기 회로 시뮬레이터",
    description: "웹 기반 전기 회로 설계 및 시뮬레이션 도구",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
