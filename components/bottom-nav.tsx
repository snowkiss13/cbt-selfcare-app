"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "ホーム", icon: "◎" },
  { href: "/cbt", label: "CBT", icon: "◇" },
  { href: "/records", label: "記録", icon: "▣" },
  { href: "/chat", label: "相談", icon: "✦" },
  { href: "/settings", label: "設定", icon: "⚙" }
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      style={{
        width: "calc(100% - 48px)",
        maxWidth: "400px",
        background: "rgba(15,10,30,0.85)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(167,139,250,0.25)",
        borderRadius: "9999px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.1)",
        padding: "8px 16px"
      }}
    >
      <div className="grid h-14 grid-cols-5">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-button text-xs font-medium transition-all duration-200 ${
                active ? "text-[var(--glow-violet)]" : "text-[var(--text-muted)]"
              }`}
            >
              <span
                aria-hidden
                className={`transition-all duration-200 ${active ? "scale-110 text-[var(--glow-violet)]" : "text-[var(--text-muted)]"}`}
                style={active ? { textShadow: "0 0 8px rgba(167,139,250,0.8)" } : undefined}
              >
                {item.icon}
              </span>
              {item.label}
              <span className={`absolute bottom-0 h-[3px] w-3 rounded-full bg-[var(--glow-violet)] transition-all duration-200 ${active ? "opacity-100" : "opacity-0"}`} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
