// Home page = the resume.
import { Briefcase, Download, FolderGit2, GraduationCap, Mail, MapPin, Wrench } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { about, education, experience, projects, skills } from "@/lib/resume";
import { site } from "@/lib/site";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

function Section({ i, icon, title, children }: { i: number; icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="fade-up" style={stagger(i)}>
      <h2 className="section-label flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

const pill =
  "inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:border-text hover:bg-hover";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="fade-up space-y-6 pt-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{site.name}</h1>
        <p className="font-serif text-xl leading-relaxed text-muted">{about}</p>
        <div className="flex flex-wrap gap-2.5">
          <a href={`mailto:${site.email}`} className={pill}>
            <Mail size={15} /> Email
          </a>
          <a href={site.links.github} target="_blank" rel="noreferrer" className={pill}>
            <GitHubIcon size={15} /> GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" className={pill}>
            <LinkedInIcon size={15} /> LinkedIn
          </a>
          <a href={site.resumePdf} target="_blank" rel="noreferrer" className={`${pill} bg-text text-bg hover:bg-text hover:opacity-85`}>
            <Download size={15} /> Resume PDF
          </a>
        </div>
      </section>

      <Section i={1} icon={<Briefcase size={14} />} title="Experience">
        <ol className="relative space-y-10 border-l border-line pl-6">
          {experience.map((r) => (
            <li key={r.company + r.period} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-text" />
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-semibold">
                  {r.title} <span className="font-normal text-muted">· {r.company}</span>
                </h3>
                <span className="shrink-0 text-sm text-muted">{r.period}</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted">
                <MapPin size={13} /> {r.location}
              </div>
              <ul className="bullets mt-3">
                {r.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section i={2} icon={<FolderGit2 size={14} />} title="Projects">
        <div className="space-y-8">
          {projects.map((p) => (
            <div key={p.name}>
              <h3 className="font-semibold">{p.name}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.split(",").map((t) => (
                  <span key={t} className="rounded-full bg-hover px-2.5 py-0.5 text-xs text-muted">
                    {t.trim()}
                  </span>
                ))}
              </div>
              <ul className="bullets mt-3">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section i={3} icon={<GraduationCap size={14} />} title="Education">
        <div className="space-y-7">
          {education.map((e) => (
            <div key={e.school}>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-semibold">{e.school}</h3>
                <span className="shrink-0 text-sm text-muted">{e.period}</span>
              </div>
              <div className="mt-1 text-sm">
                {e.degree}
                {e.detail && <span className="text-muted"> · {e.detail}</span>}
              </div>
              <div className="mt-1 text-sm text-muted">{e.coursework}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section i={4} icon={<Wrench size={14} />} title="Skills">
        <dl className="space-y-4 text-sm">
          {skills.map((s) => (
            <div key={s.group} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="shrink-0 font-semibold sm:w-36">{s.group}</dt>
              <dd className="leading-relaxed text-muted">{s.items}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}
