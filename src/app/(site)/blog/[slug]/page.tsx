import Link from "next/link";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article>
      <header className="mb-10 space-y-3">
        <Link href="/blog" className="text-sm text-muted no-underline hover:text-text">← Blog</Link>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight">{post.title}</h1>
        <p className="text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          {post.tags.length > 0 && <> · {post.tags.join(", ")}</>}
        </p>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
