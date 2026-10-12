"use client";

import { FileText, PenLine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/", label: "Resume", icon: FileText, match: (p: string) => p === "/" },
  { href: "/blog", label: "Blog", icon: PenLine, match: (p: string) => p.startsWith("/blog") },
];

export default function SiteHeader() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "border-line bg-bg/80" : "border-transparent bg-bg/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold no-underline">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-text text-xs font-bold tracking-tight text-bg">
            SS
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {nav.map(({ href, label, icon: Icon, match }) => {
            const active = match(path);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 no-underline transition-colors ${
                  active ? "bg-hover text-text" : "text-muted hover:text-text"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
          <span className="mx-1 h-5 w-px bg-line" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
