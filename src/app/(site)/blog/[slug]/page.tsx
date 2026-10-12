import { ArrowLeft, CalendarDays, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadingProgress from "@/components/ReadingProgress";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// static export won't build a dynamic route with zero pages, which is what
// happens when every post is still a draft. hand it a dummy slug that 404s.
const NONE = "__none__";

export function generateStaticParams() {
  const slugs = getAllPosts().map((p) => ({ slug: p.slug }));
  return slugs.length ? slugs : [{ slug: NONE }];
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  if (slug === NONE) return {};
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  if (slug === NONE) notFound();
  const post = await getPost(slug);

  return (
    <article className="mx-auto max-w-[680px]">
      <ReadingProgress />
      <header className="fade-up mb-12">
        <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text">
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
          All posts
        </Link>
        <h1 className="mt-6 text-[2.1rem] font-bold leading-[1.15] tracking-tight sm:text-[2.6rem]">{post.title}</h1>
        {post.summary && <p className="mt-4 font-serif text-xl leading-relaxed text-muted">{post.summary}</p>}
        <div className="mt-8 flex items-center gap-3 border-y border-line py-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-text text-sm font-bold text-bg">SS</span>
          <div className="text-sm">
            <div className="font-medium">{site.name}</div>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-muted">
              <span className="flex items-center gap-1">
                <CalendarDays size={13} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {post.readingMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="prose fade-up" style={{ "--i": 1 } as React.CSSProperties} dangerouslySetInnerHTML={{ __html: post.html }} />

      {post.tags.length > 0 && (
        <footer className="mt-16 flex flex-wrap items-center gap-2 border-t border-line pt-8">
          <Tag size={15} className="text-muted" />
          {post.tags.map((t) => (
            <Link
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className="rounded-full bg-hover px-3 py-1 text-sm text-muted transition-colors hover:bg-text hover:text-bg"
            >
              {t}
            </Link>
          ))}
        </footer>
      )}
    </article>
  );
}
