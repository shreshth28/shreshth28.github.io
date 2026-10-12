import BlogList from "@/components/BlogList";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts().map((p) => ({ ...p, dateLabel: formatDate(p.date) }));

  return (
    <div className="space-y-10">
      <header className="fade-up space-y-3 pt-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="font-serif text-xl text-muted">Short notes on things I&apos;ve learned.</p>
      </header>
      {posts.length === 0 ? <p className="text-muted">Nothing here yet.</p> : <BlogList posts={posts} />}
    </div>
  );
}
