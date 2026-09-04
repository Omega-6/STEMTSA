import Link from "next/link";
import { officialLinks, site } from "@/data/site";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/compete" },
  { label: "Resources", href: "/resources" },
  { label: "Calendar", href: "/calendar" },
  { label: "Officers", href: "/chapter#officers" },
  { label: "Past Projects", href: "/projects" },
  { label: "FAQ", href: "/hub" },
];

const OFFICIAL = [
  officialLinks.nationalTsa,
  officialLinks.themesAndProblems,
  officialLinks.paTsa,
  officialLinks.paTsaConference,
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink">
      <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="display text-lg uppercase leading-tight">
              Downingtown STEM
              <br />
              TSA
            </p>
            <p className="mt-2 text-sm text-ink-2">
              {site.school}
              <br />
              {site.location}
            </p>
          </div>

          <nav aria-label="Quick links">
            <p className="label mb-3 text-ink-3">Quick links</p>
            <ul className="space-y-1.5 text-sm">
              {QUICK.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Official resources">
            <p className="label mb-3 text-ink-3">Official resources</p>
            <ul className="space-y-1.5 text-sm">
              {OFFICIAL.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer noopener" className="link-underline">
                    {l.label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink-3">
              Maintained by TSA and PA-TSA, not by this chapter.
            </p>
          </nav>

          <div>
            <p className="label mb-3 text-ink-3">Contact</p>
            <p className="text-sm">
              <a href={`mailto:${site.contactEmail}`} className="link-underline">
                {site.contactEmail}
              </a>
            </p>
            <p className="mt-1 text-xs text-signal">{site.contactNote}</p>
            <a href={site.askAQuestionForm} target="_blank" rel="noreferrer noopener" className="btn mt-4">
              Ask a question <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-ink-3">
            © {new Date().getFullYear()} {site.chapterName}
          </p>
          <p className="label text-ink-3">
            Student-built · Not an official TSA or PA-TSA publication
          </p>
        </div>
      </div>
    </footer>
  );
}
