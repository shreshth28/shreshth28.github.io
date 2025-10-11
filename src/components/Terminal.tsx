// src/components/Terminal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import ThemeToggleInline from "./ThemeToggleInline";
import { projects, type Company } from "@/lib/projects";

type Line = { html: string };

const RESUME_URL = "https://drive.google.com/file/d/1QmcEgF6ep1ANbFfAZOZaq7U21lwLub99/view?usp=drive_link"; // ← put your Drive link here

export default function Terminal() {
  const { theme, setTheme, systemTheme } = useTheme();

  // scrollback + input state
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const [busy, setBusy] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [lines]);

  const prompt = "shreshth@portfolio:~$";

  // ───────────────── helpers ─────────────────
  const print = (html: string) => setLines((xs) => [...xs, { html }]);

  // keep prompt green + bold in history
  const printPrompt = (text: string) =>
    setLines((xs) => [
      ...xs,
      { html: `<span class="text-[#2ECC71] font-semibold">${prompt}</span> ${escapeHtml(text)}` },
    ]);

  const RULE = "─".repeat(74);
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // per-line typewriter
  const typeLines = async (arr: string[], gap = 38) => {
    for (const html of arr) {
      print(html);
      await sleep(gap);
    }
  };

  function row(label: string, value: string, pad = 12) {
    const plainLen = label ? label.length + 1 : 0;
    const spaces = " ".repeat(Math.max(0, pad - plainLen));
    const key = label ? `<span class="text-accent">${label}</span>:` + spaces : " ".repeat(pad);
    return `${key} ${value}`;
  }

  // banners
  const ARM_BANNER = `┌──────────────────────────────────────┐
│                 ARM                  │
└──────────────────────────────────────┘`;
  const QUALCOMM_BANNER = `┌──────────────────────────────────────┐
│               QUALCOMM               │
└──────────────────────────────────────┘`;
  const DELOITTE_BANNER = `┌──────────────────────────────────────┐
│               DELOITTE               │
└──────────────────────────────────────┘`;
  const PERSONAL_BANNER = `┌──────────────────────────────────────┐
│          PERSONAL PROJECTS           │
└──────────────────────────────────────┘`;

  const TENURE: Record<Company, string> = {
    Arm: "May 2025 – Aug 2025",
    Qualcomm: "Jul 2022 – Aug 2024",
    Deloitte: "Jan 2021 – May 2022",
    Personal: "",
  };

  // Build a clickable line for a project (no page nav; expand inline)
  const projectLine = (slug: string) => {
    const p = projects.find((x) => x.slug === slug)!;
    return `- <a href="#" data-slug="${p.slug}" class="underline">${escapeHtml(p.title)}</a> — ${escapeHtml(
      p.valueLine
    )}`;
  };

  const listProjectLines = (company?: Company) => {
    const items = company ? projects.filter((p) => p.company === company) : projects;
    if (!items.length) return ["(no projects)"];
    return items.map((p) => projectLine(p.slug));
  };

  // Expand a project inline in the terminal
  const expandProject = async (slug: string) => {
    const p = projects.find((x) => x.slug === slug);
    if (!p) return print(`project not found: ${escapeHtml(slug)}`);

    const header = `<div class="mt-2"><span class="text-accent font-semibold">${escapeHtml(p.title)}</span></div>`;
    const summary = `<div class="mb-1">${escapeHtml(p.valueLine)}</div>`;
    const bullets =
      p.bullets && p.bullets.length
        ? `<ul class="list-disc ml-5">${p.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`
        : "";
    const tags =
      p.tags && p.tags.length
        ? `<div class="mt-1 text-muted">tags: ${p.tags.map((t) => `<code>${escapeHtml(t)}</code>`).join(" · ")}</div>`
        : "";

    await typeLines([header, summary, bullets, tags], 16);
  };

  // intercept clicks on project titles (event delegation)
  const onScrollbackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = (e.target as HTMLElement).closest("[data-slug]") as HTMLElement | null;
    if (el) {
      e.preventDefault();
      const slug = el.getAttribute("data-slug")!;
      void expandProject(slug);
    }
  };

  // ─────────────── help ───────────────
  const cmd_help = async () =>
    typeLines(
      [
        "<b>commands</b>",
        "<code>whoami</code> — who am I?",
        "<code>skills</code> — tech stack",
        "<code>ls projects [arm|qualcomm|deloitte|personal]</code> — list all or filter (click a title to expand)",
        "<code>ls work [arm|qualcomm|deloitte]</code> — grouped by company (click titles to expand)",
        "<code>certs</code> — certifications",
        "<code>pubs</code> — publications",
        "<code>theme &lt;light|dark|system&gt;</code> — switch theme",
        "<code>resume</code> — find my resume",
        "<code>email</code> — copy email address",
        "<code>clear</code> — clear terminal",
        "<code>help</code> — this help",
      ],
      30
    );

  // ─────────────── commands ───────────────
  const cmd_ls = async (arg1?: string, arg2?: string) => {
    const a1 = (arg1 || "").toLowerCase();
    const a2 = (arg2 || "").toLowerCase();

    if (a1 === "projects") {
      if (a2 === "arm") return typeLines(listProjectLines("Arm"));
      if (a2 === "qualcomm") return typeLines(listProjectLines("Qualcomm"));
      if (a2 === "deloitte") return typeLines(listProjectLines("Deloitte"));
      if (a2 === "personal") return typeLines(listProjectLines("Personal"));
      return typeLines(listProjectLines());
    }

    if (a1 === "work") {
      const banner = (c: Company) =>
        `<pre class="terminal-pre text-accent">${
          c === "Arm" ? ARM_BANNER : c === "Qualcomm" ? QUALCOMM_BANNER : DELOITTE_BANNER
        }</pre>`;
      const tenure = (c: Company) => `<span class="text-muted">Tenure: ${TENURE[c] || "—"}</span>`;
      if (a2 === "arm") return typeLines([banner("Arm"), tenure("Arm"), ...listProjectLines("Arm")]);
      if (a2 === "qualcomm")
        return typeLines([banner("Qualcomm"), tenure("Qualcomm"), ...listProjectLines("Qualcomm")]);
      if (a2 === "deloitte")
        return typeLines([banner("Deloitte"), tenure("Deloitte"), ...listProjectLines("Deloitte")]);

      return typeLines([
        banner("Arm"),
        tenure("Arm"),
        ...listProjectLines("Arm"),
        banner("Qualcomm"),
        tenure("Qualcomm"),
        ...listProjectLines("Qualcomm"),
        banner("Deloitte"),
        tenure("Deloitte"),
        ...listProjectLines("Deloitte"),
        `<pre class="terminal-pre text-accent">${PERSONAL_BANNER}</pre>`,
        ...listProjectLines("Personal"),
      ]);
    }

    return typeLines([
      "usage: ls projects [arm|qualcomm|deloitte|personal]  •  ls work [arm|qualcomm|deloitte]",
    ]);
  };

  const cmd_resume = async () => {
    try {
      window.open(RESUME_URL, "_blank", "noopener,noreferrer");
      await typeLines([`opened resume: <a class="underline" href="${RESUME_URL}" target="_blank">Google Drive</a>`], 0);
    } catch {
      await typeLines([RESUME_URL], 0);
    }
  };

  const cmd_skills = async () =>
    typeLines(
      [
        "<span class='text-accent'>Languages</span>: C++, Python, Java, Kotlin",
        "<span class='text-accent'>Systems</span>: eBPF, Linux, Networking, Algorithms",
        "<span class='text-accent'>ML/Infra</span>: PyTorch, Docker, AWS, CI",
        "<span class='text-accent'>Android</span>: Android SDK, Performance, GNSS",
        "<span class='text-accent'>Web/Security</span>: React, Node.js, OAuth2, SAML, Web Security",
      ],
      34
    );

  const cmd_email = async () => {
    const mail = "srivastava.shreshth@outlook.com";
    try {
      await navigator.clipboard.writeText(mail);
      await typeLines([`copied: ${mail}`], 0);
    } catch {
      await typeLines([mail], 0);
    }
  };

  const cmd_certs = async () =>
    typeLines(
      [
        "• Cryptography and Information Theory — University of Colorado (Coursera)",
        "• Android Developer Nanodegree — Udacity",
        "• Open Source Software Development Methods — The Linux Foundation (Coursera)",
        "• Problem-Solving (Basic & Intermediate) — HackerRank",
        "• The Unix Workbench — Johns Hopkins University (Coursera)",
      ],
      30
    );

  const cmd_pubs = async () =>
    typeLines(
      [
        "• Decentralization of Identities Using Blockchain — 10th IEEE UP Section Int’l Conf. on Electrical, Electronics and Computer Engineering (UPCON-2023)",
        "  DOI: https://doi.org/10.1109/UPCON59197.2023.10434697",
      ],
      32
    );

  const cmd_theme = async (arg?: string) => {
    const choice = (arg || "").toLowerCase();
    if (!choice || !["light", "dark", "system"].includes(choice)) {
      return typeLines([
        `current: ${theme ?? "…"} ${theme === "system" ? `(→ ${systemTheme ?? "detecting"})` : ""}`,
        "usage: theme <light|dark|system>",
      ]);
    }
    setTheme(choice as "light" | "dark" | "system");
    return typeLines([`theme set to: ${choice}`], 18);
  };

  const cmd_whoami = async () => {
    if (busy) return;
    setBusy(true);

    print(RULE);
    const BANNER = String.raw`
███████╗██╗  ██╗██████╗ ███████╗███████╗██╗  ██╗████████╗██╗  ██╗
██╔════╝██║  ██║██╔══██╗██╔════╝██╔════╝██║  ██║╚══██╔══╝██║  ██║
███████╗███████║██████╔╝█████╗  ███████╗███████║   ██║   ███████║
╚════██║██╔══██║██╔══██╗██╔══╝  ╚════██║██╔══██║   ██║   ██╔══██║
███████║██║  ██║██║  ██║███████╗███████║██║  ██║   ██║   ██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝`;
    print(`<pre class="terminal-pre text-accent leading-4">${BANNER}</pre>`);
    await sleep(80);

    await typeLines(
      [
        row("Name", "Shreshth Srivastava"),
        row("Role", "Software Development Engineer (Systems / Android / ML Infra)"),
        row("Education", "M.S. Computer Science @ University of Colorado Boulder"),
        row("Experience", "• Arm — ML Infrastructure & IDS Benchmarking, Systems Performance"),
        row("", "• Qualcomm — Android Developer, GNSS Accuracy & x86→ARM64 Porting"),
        row("", "• Deloitte — Web & Security Eng (OAuth2, SAML, Linux, React, Node)"),
        row("Focus", "Low-level Optimization • Networking • ML Pipelines • Android Systems • Cybersecurity"),
        row(
          "Skills",
          "C++ | Python | Java | Kotlin | eBPF | PyTorch | Android | Docker | AWS | OAuth2 | SAML | React | Node.js | Git | Linux"
        ),
        row("Hobbies", "Guitar • Music • Gaming • YouTube: https://www.youtube.com/@shreshthazxcvbnm"),
        RULE,
      ],
      36
    );
    setBusy(false);
  };

  // ─────────────── runner ───────────────
  const execute = async (raw: string) => {
    const text = raw.trim();
    printPrompt(text);
    if (!text) return;

    const parts = text.split(/\s+/);
    const cmd = (parts[0] || "").toLowerCase();
    const arg1 = parts[1];
    const arg2 = parts[2];

    switch (cmd) {
      case "help": await cmd_help(); break;
      case "ls": await cmd_ls(arg1, arg2); break;
      case "resume": await cmd_resume(); break;
      case "whoami": await cmd_whoami(); break;
      case "skills": await cmd_skills(); break;
      case "certs": await cmd_certs(); break;
      case "pubs": await cmd_pubs(); break;
      case "theme": await cmd_theme(arg1); break;
      case "email": await cmd_email(); break;
      case "clear": setLines([]); break;
      default: print(`command not found: ${escapeHtml(cmd)}`);
    }
  };

  // ─────────────── autocomplete ───────────────
  const COMMANDS = ["whoami", "skills", "ls", "resume", "email", "certs", "pubs", "theme", "clear", "help"];
  const LS_FIRST = ["projects", "work"];
  const COMPANIES = ["arm", "qualcomm", "deloitte", "personal"];

  function commonPrefix(strings: string[]) {
    if (strings.length === 0) return "";
    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (!strings[i].startsWith(prefix) && prefix) prefix = prefix.slice(0, -1);
      if (!prefix) break;
    }
    return prefix;
  }

  function suggestions(tokens: string[]) {
    const [t0 = "", t1 = "", t2 = ""] = tokens;
    if (tokens.length <= 1) return COMMANDS.filter((c) => c.startsWith(t0.toLowerCase()));
    if (t0.toLowerCase() === "ls") {
      if (tokens.length === 2) return LS_FIRST.filter((x) => x.startsWith(t1.toLowerCase()));
      if (t1.toLowerCase() === "projects") return COMPANIES.filter((c) => c.startsWith(t2.toLowerCase()));
      if (t1.toLowerCase() === "work") return ["arm", "qualcomm", "deloitte"].filter((c) =>
        c.startsWith(t2.toLowerCase())
      );
      return [];
    }
    if (t0.toLowerCase() === "theme") {
      return ["light", "dark", "system"].filter((x) => x.startsWith((t1 || "").toLowerCase()));
    }
    return [];
  }

  const onTab = () => {
    const trailingSpace = /\s$/.test(input);
    const tokens = input.split(/\s+/).filter(Boolean);
    if (trailingSpace) tokens.push("");
    const matches = suggestions(tokens);

    if (tokens.length === 0) {
      const all = COMMANDS;
      const cp = commonPrefix(all);
      if (cp) setInput(cp);
      print(all.map((m) => `<span class="text-muted">${m}</span>`).join("  "));
      return;
    }

    const current = tokens[tokens.length - 1] ?? "";
    if (!matches.length) return;
    if (matches.length === 1) {
      tokens[tokens.length - 1] = matches[0];
      setInput(tokens.join(" ") + (tokens.length === 1 ? " " : ""));
      return;
    }
    const cp = commonPrefix(matches);
    if (cp && cp.length > current.length) {
      tokens[tokens.length - 1] = cp;
      setInput(tokens.join(" "));
    }
    print(matches.map((m) => `<span class="text-muted">${m}</span>`).join("  "));
  };

  // ─────────────── render ───────────────
  return (
    <section className="px-6 py-12">
      <div className="terminal-mono mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--border)] bg-surface shadow-md">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b bg-black/20 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-muted">shreshth@portfolio — zsh</span>
          </div>
          <ThemeToggleInline />
        </div>

        {/* scrollback + live prompt */}
        <div
          className="p-4 font-mono text-sm leading-6 text-text"
          onClick={onScrollbackClick}
        >
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: l.html }} />
          ))}

          <div className="mt-1 flex items-center gap-2">
            <span className="text-[#2ECC71] font-semibold">{prompt}</span>
            <input
              className="terminal-input flex-1 font-mono text-sm leading-6 text-text placeholder:text-muted tracking-normal"
              style={{ fontFamily: "var(--font-mono)" }}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              inputMode="text"
              enterKeyHint="send"
              aria-label="Terminal input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!busy) {
                    void execute(input);
                    setHistory((h) => [input, ...h]);
                    setHistIdx(-1);
                    setInput("");
                  }
                } else if (e.key === "Tab") {
                  e.preventDefault();
                  if (!busy) onTab();
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  const next = Math.min(histIdx + 1, history.length - 1);
                  setHistIdx(next);
                  if (history[next]) setInput(history[next]);
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  const next = Math.max(histIdx - 1, -1);
                  setHistIdx(next);
                  setInput(next === -1 ? "" : history[next]);
                } else if (e.key === "c" && (e.ctrlKey || e.metaKey)) {
                  print("^C");
                  setInput("");
                }
              }}
              placeholder={busy ? "" : "help"}
              disabled={busy}
            />
          </div>

          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
}

// ─────────────── utils ───────────────
function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}