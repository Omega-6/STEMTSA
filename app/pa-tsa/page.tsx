import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink, SectionHead, Todo } from "@/components/Primitives";
import { officialLinks, site } from "@/data/site";

export const metadata: Metadata = {
  title: "PA-TSA",
  description: "The Pennsylvania TSA state conference, state committees, state office and official state resources.",
};

const SECTIONS = [
  {
    id: "conference",
    n: "01",
    title: "PA-TSA State Conference",
    body: [
      "The state conference is Pennsylvania TSA's annual competition. Chapters register their members, students compete in the events they entered, and top finishers in qualifying events advance to the National TSA Conference in June.",
      "For most members it is the point of the season: it is where the project you have been building since the autumn is actually judged.",
    ],
    todo:
      "Dates, venue, registration window and cost are published by PA-TSA each year. Add this season's once they are out — do not guess them.",
    link: officialLinks.paTsaConference,
  },
  {
    id: "committees",
    n: "02",
    title: "State committees",
    body: [
      "PA-TSA runs committees that members from any chapter can serve on. It is the lowest-friction way to be involved beyond Downingtown: you work with students from across the state, and it counts as real leadership experience rather than a line on a form.",
      "Applications and committee lists are posted on the PA-TSA site, usually alongside conference materials.",
    ],
    todo:
      "Add which committees Downingtown STEM members currently serve on, and who to talk to here before applying.",
    link: officialLinks.paTsa,
  },
  {
    id: "office",
    n: "03",
    title: "State office",
    body: [
      "PA-TSA elects a state officer team. Running means campaigning at the state conference and, if elected, committing a real amount of time across the following year.",
      "If you are considering it, talk to a chapter president first — the chapter has to support a candidacy, and the timeline starts well before the conference.",
    ],
    todo:
      "Add the current election timeline, eligibility requirements and application link from PA-TSA, plus any chapter-level process.",
    link: officialLinks.paTsa,
  },
];

export default function PaTsaPage() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
      <header className="py-10 lg:py-14">
        <p className="label text-navy">Beyond the chapter</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4rem)] uppercase">PA-TSA</h1>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-12">
          <p className="text-lg text-ink-2">
            Pennsylvania TSA is the state organisation our chapter belongs to. It runs the state conference, the state
            committees and the state officer team.
          </p>
          <aside className="border-l-2 border-navy pl-4 text-sm text-ink-2">
            <p className="label mb-1 text-navy">Who wrote what</p>
            <p>
              Everything on this page is written by Downingtown STEM TSA to explain how PA-TSA works. It is not an
              official PA-TSA publication, and where the two differ, PA-TSA is right.
            </p>
            <ArrowLink href={officialLinks.paTsa.href} external className="mt-3 inline-block">
              patsa.org
            </ArrowLink>
          </aside>
        </div>
      </header>

      {SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-24 py-10">
          <SectionHead index={s.n} title={s.title} />
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,44rem)_1fr] lg:gap-12">
            <div className="space-y-3 text-ink-2">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <Todo>{s.todo}</Todo>
            </div>
            <div className="border border-rule p-5">
              <p className="label text-ink-3">Official source</p>
              <p className="display mt-1 text-lg">{s.link.label}</p>
              <p className="mt-2 text-sm text-ink-2">{s.link.note}</p>
              <a href={s.link.href} target="_blank" rel="noreferrer noopener" className="btn mt-4 w-full justify-center">
                Open <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </section>
      ))}

      <section id="resources" className="scroll-mt-24 py-10">
        <SectionHead
          index="04"
          title="State resources"
          intro="Maintained by PA-TSA. We link rather than mirror, so nothing here goes stale without us noticing."
        />
        <ul className="mt-6 border-t border-ink">
          {[officialLinks.paTsa, officialLinks.paTsaConference, officialLinks.competitions, officialLinks.themesAndProblems].map(
            (l) => (
              <li key={l.label} className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-4">
                <ArrowLink href={l.href} external>
                  {l.label}
                </ArrowLink>
                <span className="max-w-md text-sm text-ink-2">{l.note}</span>
              </li>
            ),
          )}
        </ul>
      </section>

      <section id="news" className="scroll-mt-24 py-10 pb-16">
        <SectionHead
          index="05"
          title="PA-TSA news"
          intro="State-level updates that affect our members, summarised by our officers."
        />
        <Todo>
          No state updates posted yet. Add them as announcements in{" "}
          <code className="font-mono text-ink">data/announcements.ts</code> with{" "}
          <code className="font-mono text-ink">category: &quot;PA-TSA&quot;</code>, and always link the PA-TSA source
          so members can check the original.
        </Todo>
        <p className="mt-6 max-w-2xl text-ink-2">
          Interested in committees or state office and not sure where to start?{" "}
          <Link href="/hub" className="link-underline">
            Ask in the Hub
          </Link>{" "}
          or send it straight to the{" "}
          <a href={site.askAQuestionForm} target="_blank" rel="noreferrer noopener" className="link-underline">
            officer form
          </a>
          .
        </p>
      </section>
    </div>
  );
}
