import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink, SectionHead } from "@/components/Primitives";
import { chapterResources, competitionResources, learningTracks } from "@/data/resources";
import type { ResourceGroup } from "@/lib/types";
import { officialLinks, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resources",
  description: "Event guides, rubrics, templates, chapter documents and skill-by-skill learning tracks.",
};

function Group({ group }: { group: ResourceGroup }) {
  return (
    <div className="border-b border-rule py-6">
      <div className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-10">
        <div>
          <h3 className="display text-xl leading-tight">{group.title}</h3>
          <p className="mt-1 text-sm text-ink-2">{group.blurb}</p>
        </div>
        <ul>
          {group.links.map((l) => (
            <li key={l.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule py-3 first:border-t-0 lg:first:border-t">
              <span className="flex flex-wrap items-baseline gap-3">
                {l.href ? (
                  <ArrowLink href={l.href} external={l.href.startsWith("http")}>
                    {l.label}
                  </ArrowLink>
                ) : (
                  <span className="text-ink-3 line-through decoration-signal/60">{l.label}</span>
                )}
                {l.official && <span className="label border border-navy px-1.5 py-0.5 text-navy">Official</span>}
                {!l.href && <span className="label border border-signal px-1.5 py-0.5 text-signal">Link needed</span>}
              </span>
              {l.note && <span className="max-w-md text-sm text-ink-2">{l.note}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
      <header className="py-10 lg:py-14">
        <p className="label text-navy">Reference</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4rem)] uppercase">Resources</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-2">
          Two kinds of thing live here. Official documents, which TSA and PA-TSA maintain and which decide your score.
          And chapter material, which we write and can be wrong. Anything marked{" "}
          <span className="label border border-navy px-1.5 py-0.5 text-navy">Official</span> is theirs, not ours.
        </p>
      </header>

      <section id="competition" className="scroll-mt-24 py-8">
        <SectionHead
          index="01"
          title="Competition resources"
          intro="Guides, rubrics, themes and submission requirements."
          action={<ArrowLink href={officialLinks.competitions.href} external>tsaweb.org</ArrowLink>}
        />
        <div className="mt-4 border-t border-ink">
          {competitionResources.map((g) => (
            <Group key={g.title} group={g} />
          ))}
        </div>
      </section>

      <section id="chapter" className="scroll-mt-24 py-8">
        <SectionHead index="02" title="Chapter resources" intro="Internal material for members and officers." />
        <div className="mt-4 border-t border-ink">
          {chapterResources.map((g) => (
            <Group key={g.title} group={g} />
          ))}
        </div>
      </section>

      <section id="learning" className="scroll-mt-24 py-8 pb-16">
        <SectionHead
          index="03"
          title="Learning resources"
          intro="If your event needs a skill you do not have yet, start here. Each track lists what the skill is for, not just where to click."
        />
        <div className="mt-8 space-y-10">
          {learningTracks.map((track, i) => (
            <div key={track.field}>
              <div className="flex flex-wrap items-baseline gap-4 border-b border-ink pb-3">
                <span className="label text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-2xl">{track.field}</h3>
                <p className="text-sm text-ink-2">{track.blurb}</p>
              </div>
              <ul className="grid grid-cols-1 border-l border-rule sm:grid-cols-2 lg:grid-cols-3">
                {track.skills.map((s) => (
                  <li key={s.name} className="border-b border-r border-rule p-4">
                    <p className="display text-lg">{s.name}</p>
                    <p className="mt-1 text-sm text-ink-2">{s.why}</p>
                    {s.href ? (
                      <ArrowLink href={s.href} external className="mt-3 inline-block">
                        Start here
                      </ArrowLink>
                    ) : (
                      <span className="label mt-3 inline-block text-signal">Link needed</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-ink-2">
          Officers: tracks and skills are plain arrays in{" "}
          <code className="font-mono text-ink">data/resources.ts</code>. Adding a field is one object; adding a skill is
          one line. Nothing in the components needs to change.{" "}
          <Link href="/hub" className="link-underline">
            Suggest a resource through the Hub
          </Link>{" "}
          or the{" "}
          <a href={site.askAQuestionForm} target="_blank" rel="noreferrer noopener" className="link-underline">
            officer form
          </a>
          .
        </p>
      </section>
    </div>
  );
}
