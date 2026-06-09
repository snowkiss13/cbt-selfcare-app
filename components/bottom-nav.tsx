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
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-black/10 bg-paper/95 backdrop-blur md:top-0 md:h-16">
      <div className="mx-auto grid h-16 max-w-5xl grid-cols-5 px-2">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-button text-xs font-medium transition-all duration-200 md:flex-row md:text-sm ${
                active ? "text-primary" : "text-[var(--gray-500)]"
              }`}
            >
              <span aria-hidden className={`transition-all duration-200 ${active ? "scale-110 text-primary" : "text-[var(--gray-500)]"}`}>
                {item.icon}
              </span>
              {item.label}
              <span className={`absolute bottom-1 h-[3px] w-3 rounded-full bg-primary transition-all duration-200 md:bottom-2 ${active ? "opacity-100" : "opacity-0"}`} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
