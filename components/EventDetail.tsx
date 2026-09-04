import Link from "next/link";
import type { CompetitionEvent } from "@/lib/types";
import { getProject } from "@/data/projects";
import { officialLinks } from "@/data/site";
import { ArrowLink, PhotoPlaceholder, SectionHead, Tag } from "./Primitives";
import { formatDate } from "@/lib/format";

/* ---------------------------------------------------------------------------
   Reusable event-detail template. Every section is driven by data/events.ts.
   A null field renders `Missing` — a visible pointer at the official guide —
   rather than inventing a rule we do not control.
   --------------------------------------------------------------------------- */

const SECTIONS = [
  { id: "overview", n: "01", title: "Overview" },
  { id: "eligibility", n: "02–04", title: "Who competes, team size, format" },
  { id: "theme", n: "05", title: "Current theme / problem" },
  { id: "requirements", n: "06", title: "Requirements" },
  { id: "deliverables", n: "07", title: "Deliverables" },
  { id: "deadlines", n: "08", title: "Important deadlines" },
  { id: "rubric", n: "09", title: "Rubric" },
  { id: "preliminary", n: "10", title: "Preliminary requirements" },
  { id: "semifinal", n: "11", title: "Semifinal requirements" },
  { id: "bring", n: "12", title: "What to bring" },
  { id: "resources", n: "13", title: "Helpful resources" },
  { id: "past", n: "14", title: "Past Downingtown projects" },
  { id: "mistakes", n: "15", title: "Common mistakes" },
  { id: "official", n: "16", title: "Official TSA resources" },
];

function Missing({ what, href }: { what: string; href: string }) {
  return (
    <div className="todo mt-3 text-sm">
      <span className="label mr-2 text-signal">Not documented yet</span>
      This section comes from the official event guide, which changes each season. Read {what} there, then paste the
      current version into <code className="font-mono text-ink-2">data/events.ts</code>.
      <div className="mt-2">
        <ArrowLink href={href} external>
          Open the official guide
        </ArrowLink>
      </div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 border-b border-rule pb-2 text-sm">
          <span className="label shrink-0 pt-0.5 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function EventDetail({ event }: { event: CompetitionEvent }) {
  const guide = event.officialGuideUrl;

  return (
    <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
      {/* Masthead */}
      <div className="border-b border-ink py-8 lg:py-12">
        <Link href="/compete" className="label text-ink-3 hover:text-ink">
          ← All events
        </Link>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="navy">{event.category}</Tag>
              <Tag>{event.participation}</Tag>
              {event.level === "PA only" && <Tag tone="signal">PA-TSA event only</Tag>}
            </div>
            <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">{event.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-2">{event.summary}</p>
          </div>

          <aside className="border border-rule-strong p-5">
            <p className="label text-ink-3">Chapter status</p>
            <p className={`display mt-1 text-xl ${event.status === "Status TBD" ? "text-signal" : ""}`}>
              {event.status === "Status TBD" ? "Not set yet" : event.status}
            </p>
            <p className="mt-3 text-xs text-ink-2">
              Set by the VPs of Competitions in <code className="font-mono">data/events.ts</code>.
            </p>
            <a href={guide} target="_blank" rel="noreferrer noopener" className="btn btn-primary mt-5 w-full justify-center">
              Official guide <span aria-hidden>↗</span>
            </a>
          </aside>
        </div>
      </div>

      <div className="grid gap-10 py-10 lg:grid-cols-[13rem_1fr] lg:gap-14">
        {/* Section index */}
        <nav aria-label="On this page" className="hidden lg:block">
          <p className="label mb-3 text-ink-3">On this page</p>
          <ol className="sticky top-24 space-y-1.5">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="label flex gap-3 text-ink-2 hover:text-navy">
                  <span className="w-12 shrink-0 whitespace-nowrap text-ink-3">{s.n}</span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-12">
          <section id="overview" className="scroll-mt-24">
            <SectionHead index="01" title="Overview" />
            {event.overview ? (
              <p className="mt-4 max-w-3xl text-ink-2">{event.overview}</p>
            ) : (
              <Missing what="the full event description" href={guide} />
            )}
          </section>

          <section id="eligibility" className="scroll-mt-24">
            <SectionHead index="02–04" title="Who competes, team size, format" />
            <dl className="mt-4 grid grid-cols-1 border-t border-rule sm:grid-cols-3">
              {[
                { n: "02", term: "Who can compete", value: event.whoCanCompete },
                { n: "03", term: "Team size", value: event.teamSize ?? null },
                { n: "04", term: "Event type", value: event.eventType },
              ].map((f) => (
                <div key={f.term} className="border-b border-rule py-4 sm:border-r sm:px-5 sm:first:pl-0">
                  <dt className="label text-ink-3">
                    <span className="mr-2">{f.n}</span>
                    {f.term}
                  </dt>
                  <dd className="mt-2 text-sm">
                    {f.value ?? <span className="text-signal">From the official guide — not filled in yet</span>}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-ink-3">
              Participation shown on the card ({event.participation}) is a chapter-maintained hint. The official guide
              is the authority.
            </p>
          </section>

          <section id="theme" className="scroll-mt-24">
            <SectionHead index="05" title="Current theme / problem" />
            {event.currentTheme ? (
              <p className="mt-4 max-w-3xl text-ink-2">{event.currentTheme}</p>
            ) : (
              <Missing what="this season&rsquo;s theme or problem statement" href={officialLinks.themesAndProblems.href} />
            )}
          </section>

          <section id="requirements" className="scroll-mt-24">
            <SectionHead index="06" title="Requirements" />
            {event.requirements ? <List items={event.requirements} /> : <Missing what="the requirement list" href={guide} />}
          </section>

          <section id="deliverables" className="scroll-mt-24">
            <SectionHead index="07" title="Deliverables" />
            {event.deliverables ? <List items={event.deliverables} /> : <Missing what="the deliverable list" href={guide} />}
          </section>

          <section id="deadlines" className="scroll-mt-24">
            <SectionHead
              index="08"
              title="Important deadlines"
              action={<ArrowLink href="/calendar?view=deadlines">All deadlines</ArrowLink>}
            />
            {event.deadlines && event.deadlines.length > 0 ? (
              <ul className="mt-4 border-t border-rule">
                {event.deadlines.map((d) => (
                  <li key={d.label} className="flex flex-wrap justify-between gap-2 border-b border-rule py-3">
                    <span>{d.label}</span>
                    <span className="label text-ink-2">{formatDate(d.date)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <Missing what="the submission and registration dates" href={guide} />
            )}
          </section>

          <section id="rubric" className="scroll-mt-24">
            <SectionHead index="09" title="Rubric" />
            {event.rubric && event.rubric.length > 0 ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-y border-ink">
                      <th scope="col" className="label py-2 pr-4 text-left text-ink-3">Criterion</th>
                      <th scope="col" className="label py-2 pr-4 text-left text-ink-3">Points</th>
                      <th scope="col" className="label py-2 text-left text-ink-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.rubric.map((r) => (
                      <tr key={r.criterion} className="border-b border-rule align-top">
                        <td className="py-3 pr-4">{r.criterion}</td>
                        <td className="py-3 pr-4 font-mono">{r.points}</td>
                        <td className="py-3 text-ink-2">{r.notes ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Missing what="the scoring rubric" href={guide} />
            )}
          </section>

          <section id="preliminary" className="scroll-mt-24">
            <SectionHead index="10" title="Preliminary requirements" />
            {event.preliminaryRequirements ? (
              <List items={event.preliminaryRequirements} />
            ) : (
              <Missing what="what the preliminary round asks for" href={guide} />
            )}
          </section>

          <section id="semifinal" className="scroll-mt-24">
            <SectionHead index="11" title="Semifinal requirements" />
            {event.semifinalRequirements ? (
              <List items={event.semifinalRequirements} />
            ) : (
              <Missing what="what the semifinal round asks for" href={guide} />
            )}
          </section>

          <section id="bring" className="scroll-mt-24">
            <SectionHead index="12" title="What to bring" />
            {event.whatToBring ? <List items={event.whatToBring} /> : <Missing what="the required materials list" href={guide} />}
          </section>

          <section id="resources" className="scroll-mt-24">
            <SectionHead
              index="13"
              title="Helpful resources"
              intro="Chapter-picked material for building the skills this event needs."
              action={<ArrowLink href="/resources#learning">Learning tracks</ArrowLink>}
            />
            {event.helpfulResources && event.helpfulResources.length > 0 ? (
              <ul className="mt-4 border-t border-rule">
                {event.helpfulResources.map((r) => (
                  <li key={r.href} className="border-b border-rule py-3">
                    <ArrowLink href={r.href} external>
                      {r.label}
                    </ArrowLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-ink-2">
                Nothing event-specific yet. The{" "}
                <Link href="/resources#learning" className="link-underline">
                  learning tracks
                </Link>{" "}
                cover the underlying skills in the meantime.
              </p>
            )}
          </section>

          <section id="past" className="scroll-mt-24">
            <SectionHead
              index="14"
              title="Past Downingtown projects"
              action={<ArrowLink href="/projects">Full archive</ArrowLink>}
            />
            {event.pastProjects.length > 0 ? (
              <ul className="mt-4 grid gap-5 sm:grid-cols-2">
                {event.pastProjects.map((slug) => {
                  const p = getProject(slug);
                  if (!p) return null;
                  return (
                    <li key={slug} className="border border-rule">
                      <PhotoPlaceholder caption={`${p.title} — ${p.year}`} ratio="16 / 9" className="border-0 border-b" />
                      <div className="p-4">
                        <p className="label text-ink-3">{p.year} · {p.placement}</p>
                        <p className="display mt-1 text-lg">{p.title}</p>
                        <ArrowLink href={`/projects/${p.slug}`} className="mt-2 inline-block">
                          Read the write-up
                        </ArrowLink>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="todo mt-4 text-sm">
                <span className="label mr-2 text-signal">Needs input</span>
                No write-ups linked to this event yet. Add one to{" "}
                <code className="font-mono text-ink-2">data/projects.ts</code> and list its slug in this event&apos;s{" "}
                <code className="font-mono text-ink-2">pastProjects</code>.
              </div>
            )}
          </section>

          <section id="mistakes" className="scroll-mt-24">
            <SectionHead
              index="15"
              title="Common mistakes"
              intro="Written by students who competed in this event, not taken from the guide."
            />
            {event.commonMistakes ? (
              <List items={event.commonMistakes} />
            ) : (
              <div className="todo mt-4 text-sm">
                <span className="label mr-2 text-signal">Needs input</span>
                Ask last year&apos;s team what cost them points, then write it here. This is the section that is worth
                the most to the next team and the only one we can write ourselves.
              </div>
            )}
          </section>

          <section id="official" className="scroll-mt-24">
            <SectionHead
              index="16"
              title="Official TSA resources"
              intro="These sites are maintained by TSA and PA-TSA. When they disagree with this page, they win."
            />
            <ul className="mt-4 border-t border-rule">
              {[officialLinks.competitions, officialLinks.themesAndProblems, officialLinks.paTsa].map((l) => (
                <li key={l.label + l.note} className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule py-3">
                  <ArrowLink href={l.href} external>
                    {l.label}
                  </ArrowLink>
                  <span className="text-sm text-ink-2">{l.note}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
