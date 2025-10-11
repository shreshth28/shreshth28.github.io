"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggleInline() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const effective = theme === "system" ? systemTheme : theme;

  const Btn = ({ value, label }: { value: "light" | "dark" | "system"; label: string }) => (
    <button
      type="button"
      onClick={() => setTheme(value)}
      className={[
        "px-2 py-0.5 rounded text-xs",
        effective === value ? "bg-white/15 text-text" : "hover:bg-white/10 text-muted",
      ].join(" ")}
      aria-pressed={effective === value}
      aria-label={`Switch to ${label} theme`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center">
      <div className="flex overflow-hidden rounded-lg border border-white/10 bg-white/5">
        <Btn value="light" label="Light" />
        <Btn value="dark" label="Dark" />
        <Btn value="system" label="System" />
      </div>
    </div>
  );
}