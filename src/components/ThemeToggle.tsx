"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-hover hover:text-text"
    >
      {mounted ? (
        <span key={dark ? "sun" : "moon"} className="spin-in">
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </span>
      ) : (
        <span className="h-[17px] w-[17px]" />
      )}
    </button>
  );
}
