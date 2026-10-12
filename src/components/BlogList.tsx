"use client";

import { ArrowRight, Clock, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

export type ListPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  dateLabel: string;
  readingMinutes: number;
  tags: string[];
};

const chip = "rounded-full px-3 py-1 text-sm transition-colors";

export default function BlogList({ posts }: { posts: ListPost[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const [q, setQ] = useState("");

  // filters live in the url so a filtered view can be shared (?tag=cuda&q=warp)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setTag(p.get("tag"));
    setQ(p.get("q") ?? "");
  }, []);

  useEffect(() => {
    const p = new URLSearchParams();
    if (tag) p.set("tag", tag);
    if (q) p.set("q", q);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [tag, q]);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [posts]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (!tag || p.tags.includes(tag)) &&
        (!needle || [p.title, p.summary, ...p.tags].some((s) => s.toLowerCase().includes(needle))),
    );
  }, [posts, tag, q]);

  return (
    <div className="space-y-8">
      <div className="fade-up space-y-4" style={{ "--i": 1 } as CSSProperties}>
        <label className="flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5 transition-colors focus-within:border-text">
          <Search size={16} className="text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts"
            className="w-full bg-transparent text-[0.95rem] outline-none placeholder:text-muted"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="text-muted hover:text-text">
              <X size={16} />
            </button>
          )}
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTag(null)}
            className={`${chip} ${!tag ? "bg-text text-bg" : "bg-hover text-muted hover:text-text"}`}
          >
            All <span className="opacity-60">{posts.length}</span>
          </button>
          {tags.map(([t, n]) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(tag === t ? null : t)}
              className={`${chip} ${tag === t ? "bg-text text-bg" : "bg-hover text-muted hover:text-text"}`}
            >
              {t} <span className="opacity-60">{n}</span>
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="fade-up py-12 text-center text-muted">
          <p>No posts match that.</p>
          <button
            type="button"
            onClick={() => {
              setTag(null);
              setQ("");
            }}
            className="mt-3 text-sm text-text underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul key={`${tag}|${q}`} className="-mx-4 divide-y divide-line">
          {shown.map((p, i) => (
            <li key={p.slug} className="fade-up" style={{ "--i": i } as CSSProperties}>
              <div className="card group rounded-lg px-4 py-7 hover:bg-hover">
                <Link href={`/blog/${p.slug}`} className="block">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <time dateTime={p.date}>{p.dateLabel}</time>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {p.readingMinutes} min
                    </span>
                  </div>
                  <h2 className="mt-2 flex items-center gap-2 text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                    {p.title}
                    <ArrowRight size={18} className="arrow shrink-0" />
                  </h2>
                  {p.summary && <p className="mt-2 font-serif text-lg leading-relaxed text-muted">{p.summary}</p>}
                </Link>
                {p.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTag(t)}
                        className={`rounded-full px-2.5 py-0.5 text-xs transition-colors ${
                          tag === t ? "bg-text text-bg" : "bg-hover text-muted group-hover:bg-bg hover:text-text"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
