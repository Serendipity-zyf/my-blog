import type { Metadata } from "next";
import { titleFont, bodyFont, codeFont, decorativeFont } from '@/lib/fonts'
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { incrementViewCount } from '@/lib/stats'

export const metadata: Metadata = {
  title: "PixelCookies",
  description: "Personal blog and portfolio",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 增加访问量
  await incrementViewCount()

  return (
    <html lang="zh" suppressHydrationWarning className={`${titleFont.variable} ${bodyFont.variable} ${codeFont.variable} ${decorativeFont.variable}`}>
      <body className="font-body">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
