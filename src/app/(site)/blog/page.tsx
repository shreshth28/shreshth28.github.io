import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted">Short notes on things I&apos;ve learned.</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">Nothing here yet.</p>
      ) : (
        <ul className="divide-y divide-line border-t border-line">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group block py-5 no-underline">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h2 className="font-medium group-hover:underline">{p.title}</h2>
                  <time dateTime={p.date} className="shrink-0 text-sm text-muted">
                    {formatDate(p.date)}
                  </time>
                </div>
                {p.summary && <p className="mt-1 text-sm text-muted">{p.summary}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
