"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export function ThemeShell({ children }: { children: React.ReactNode }) {
  const settings = useAppStore((state) => state.settings);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.body.className = `font-${settings.fontSize}`;
  }, [settings.theme, settings.fontSize]);

  return children;
}
