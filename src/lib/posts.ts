// src/lib/posts.ts
// Loads Markdown blog posts from content/posts at build time.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

type Frontmatter = {
  title?: string;
  date?: string | Date;
  summary?: string;
  tags?: string[];
  draft?: boolean;
};

// Drafts show up in `npm run dev` but never in the exported site.
const showDrafts = process.env.NODE_ENV !== "production";

function readSource(slug: string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  return { fm: data as Frontmatter, content };
}

function toMeta(slug: string, fm: Frontmatter, content: string): PostMeta {
  if (!fm.title || !fm.date) {
    throw new Error(`content/posts/${slug}.md needs a "title" and "date" in its frontmatter`);
  }
  const date = fm.date instanceof Date ? fm.date.toISOString().slice(0, 10) : String(fm.date);
  return {
    slug,
    title: fm.title,
    date,
    summary: fm.summary ?? "",
    tags: (fm.tags ?? []).map((t) => t.toLowerCase()),
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const { fm, content } = readSource(slug);
      return { meta: toMeta(slug, fm, content), draft: fm.draft === true };
    })
    .filter((n) => showDrafts || !n.draft)
    .map((n) => n.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post> {
  const { fm, content } = readSource(slug);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypePrettyCode, {
      theme: { light: "min-light", dark: "min-dark" },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(content);
  return { ...toMeta(slug, fm, content), html: String(file) };
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
