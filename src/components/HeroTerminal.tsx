
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const lines = [
  "Network/ML Performance • Systems • C++/Python",
  "Ex-Arm Intern • ex-Qualcomm • MS CS @ CU Boulder",
  "Ships measurable speedups and clean tooling.",
];

export default function HeroTerminal() {
  const [typed, setTyped] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let mounted = true;
    let ti: any, li: any;
    const typeLine = (text: string) => {
      let i = 0;
      setTyped("");
      ti = setInterval(() => {
        if (!mounted) return;
        i++;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(ti);
          li = setTimeout(() => setIdx((p) => (p + 1) % lines.length), 1400);
        }
      }, 18);
    };
    typeLine(lines[idx]);
    return () => { mounted = false; clearInterval(ti); clearTimeout(li); };
  }, [idx]);

  return (
    <section className="grid place-items-center px-6 py-16">
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-surface p-6 shadow-xl">
        <div className="font-mono text-sm text-muted">shreshth@portfolio:~$ whoami</div>
        <div className="mt-2 font-mono text-xl text-text">
          <span className="align-middle">{typed}</span>
          <span className="ml-1 inline-block h-[1.2em] w-[1ch] animate-pulse bg-accent" aria-hidden />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/resume"
            className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-sm text-text outline-none transition hover:border-accent/70 hover:bg-accent/20 focus-visible:ring-2 focus-visible:ring-accent"
          >
            View Resume
          </Link>
          <a
            href="mailto:srivastava.shreshth@outlook.com"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm text-text outline-none transition hover:border-white/20 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Email Me
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 text-xs text-muted max-sm:grid-cols-1">
          {["systems","networking","eBPF","cpp","python","pytorch","android","aws"].map((t) => (
            <span key={t} className="font-mono rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}