import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { ThemeShell } from "@/components/theme-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });

export const metadata: Metadata = {
  title: "CBT Self Care",
  description: "AI伴走型CBTセルフケアアプリ"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>
        <ThemeShell>
          <main className="mx-auto min-h-screen w-full max-w-5xl px-4 pb-24 pt-5 md:px-6 md:pb-10">{children}</main>
          <BottomNav />
        </ThemeShell>
      </body>
    </html>
  );
}
