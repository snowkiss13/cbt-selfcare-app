import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { ThemeShell } from "@/components/theme-shell";

export const metadata: Metadata = {
  title: "CBT Self Care",
  description: "AI伴走型CBTセルフケアアプリ"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ThemeShell>
          <main className="mx-auto min-h-screen w-full max-w-5xl px-4 pb-24 pt-5 md:px-6 md:pb-10">{children}</main>
          <BottomNav />
        </ThemeShell>
      </body>
    </html>
  );
}
