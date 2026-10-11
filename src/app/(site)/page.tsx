// Home page = the resume.
import { about, education, experience, projects, skills } from "@/lib/resume";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="space-y-5">
        <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
        <p className="leading-relaxed text-muted">{about}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={site.resumePdf} target="_blank" rel="noreferrer">Resume (PDF)</a>
        </div>
      </section>

      <section>
        <h2 className="section-label">Experience</h2>
        <div className="space-y-10">
          {experience.map((r) => (
            <div key={r.company + r.period}>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-medium">
                  {r.title}, {r.company}
                </h3>
                <span className="shrink-0 text-sm text-muted">{r.period}</span>
              </div>
              <div className="mt-0.5 text-sm text-muted">{r.location}</div>
              <ul className="bullets mt-3">
                {r.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-label">Projects</h2>
        <div className="space-y-8">
          {projects.map((p) => (
            <div key={p.name}>
              <h3 className="font-medium">{p.name}</h3>
              <div className="mt-0.5 text-sm text-muted">{p.stack}</div>
              <ul className="bullets mt-3">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-label">Education</h2>
        <div className="space-y-6">
          {education.map((e) => (
            <div key={e.school}>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-medium">{e.school}</h3>
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
      </section>

      <section>
        <h2 className="section-label">Skills</h2>
        <dl className="space-y-3 text-sm">
          {skills.map((s) => (
            <div key={s.group} className="flex flex-col sm:flex-row sm:gap-6">
              <dt className="shrink-0 font-medium sm:w-32">{s.group}</dt>
              <dd className="text-muted">{s.items}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
