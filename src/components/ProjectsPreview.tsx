import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsPreview() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16">
      <div className="mb-4 font-mono text-sm text-muted">
        shreshth@portfolio:~$ ls projects/
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="block rounded-2xl border border-white/10 bg-surface p-4 hover:border-white/20"
          >
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-muted">{p.valueLine}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="font-mono text-xs rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/projects" className="font-mono text-sm underline underline-offset-4">
          view all →
        </Link>
      </div>
    </section>
  );
}