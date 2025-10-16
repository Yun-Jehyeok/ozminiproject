import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
    title: "MBTI Chat",
    description: "MBTI 기반 AI 채팅 애플리케이션",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YYFT6Q25C3" />
                <Script id="google-analytics">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-YYFT6Q25C3');
                    `}
                </Script>
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children} <Analytics />
            </body>
        </html>
    );
}
