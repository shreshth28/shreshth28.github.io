// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <div className="font-mono text-sm text-muted">
        shreshth@portfolio:~$ cat projects/{p.slug}.md
      </div>
      <h1 className="mt-3 text-2xl font-bold">{p.title}</h1>
      <p className="mt-2 text-muted">{p.valueLine}</p>

      <ul className="mt-6 list-disc space-y-2 pl-6">
        {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>

      {p.links && (p.links.code || p.links.demo) && (
        <div className="mt-6 flex gap-4">
          {p.links.code && (
            <a className="underline" href={p.links.code} target="_blank">
              Code
            </a>
          )}
          {p.links.demo && (
            <a className="underline" href={p.links.demo} target="_blank">
              Demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}

// optional: helps Next.js pre-build all projects at build time
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}