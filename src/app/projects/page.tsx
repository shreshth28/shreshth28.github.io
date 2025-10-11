import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-4 font-mono text-sm text-muted">
        shreshth@portfolio:~$ ls projects/
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="block rounded-2xl border border-white/10 bg-surface p-4 hover:border-white/20">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-muted">{p.valueLine}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}