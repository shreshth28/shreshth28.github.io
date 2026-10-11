// Shared header + footer for the main site.
import Link from "next/link";
import { site } from "@/lib/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 sm:px-6">
      <header className="flex items-center justify-between gap-4 py-10">
        <Link href="/" className="font-semibold no-underline">
          {site.name}
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="text-muted no-underline hover:text-text">Resume</Link>
          <Link href="/blog" className="text-muted no-underline hover:text-text">Blog</Link>
        </nav>
      </header>
      <main className="flex-1 pb-20">{children}</main>
      <footer className="border-t border-line py-8 text-sm text-muted">
        © {new Date().getFullYear()} {site.name}
      </footer>
    </div>
  );
}
