// src/app/resume/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Resume — Shreshth Srivastava",
};

export default function ResumePage() {
  // this path serves the static PDF from /public
  const href = "/resume.pdf";

  return (
    <main className="min-h-screen bg-[#0B0E14] text-[#E6EDF3]">
      <div className="mx-auto max-w-5xl p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Link
            href={href}
            download
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
          >
            Download PDF
          </Link>
          <Link
            href="mailto:srivastava.shreshth@outlook.com"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
          >
            Email Me
          </Link>
        </div>

        {/* Try to embed the PDF. Some browsers may block it; the <p> is the fallback */}
        <object
          data={href + "#view=FitH"}
          type="application/pdf"
          className="h-[85vh] w-full rounded-xl border border-white/10"
        >
          <p className="mt-4 text-lg text-white/80">
            Your browser can’t display PDFs inline.{" "}
            <a className="underline" href={href} target="_blank" rel="noreferrer">
              Open the PDF
            </a>
            .
          </p>
        </object>
      </div>
    </main>
  );
}