import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/lib/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-10 sm:px-6">{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:px-6">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="flex items-center gap-1">
            {[
              { href: `mailto:${site.email}`, label: "Email", icon: <Mail size={16} /> },
              { href: site.links.github, label: "GitHub", icon: <GitHubIcon /> },
              { href: site.links.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                aria-label={l.label}
                title={l.label}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-hover hover:text-text"
              >
                {l.icon}
              </a>
            ))}
          </span>
        </div>
      </footer>
    </div>
  );
}
