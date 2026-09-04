import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementCard from "@/components/AnnouncementCard";
import OfficerCard from "@/components/OfficerCard";
import { ArrowLink, PhotoPlaceholder, SectionHead, Todo } from "@/components/Primitives";
import { announcements } from "@/data/announcements";
import { advisers, officers, OFFICER_TIERS } from "@/data/officers";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Chapter",
  description: "The Downingtown STEM TSA officer team, advisers and chapter announcements.",
};

export default function ChapterPage() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
      <header className="py-10 lg:py-14">
        <p className="label text-navy">{site.season}</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4rem)] uppercase">Our chapter</h1>
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <p className="text-lg text-ink-2 lg:col-span-5">
            {officers.length} officers run this chapter: recruitment and onboarding, event rosters and deadlines,
            communications, records and the budget. If you are not sure who to ask, ask any of them.
          </p>
          <div className="lg:col-span-7">
            <PhotoPlaceholder
              ratio="2 / 1"
              caption="Officer team group photo. Replace once one is taken this season."
            />
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------- OFFICERS */}
      <section id="officers" className="scroll-mt-24 py-10">
        <SectionHead
          index="01"
          title="Officer team"
          intro="Names and positions are current. Photos and individual email addresses are not published yet — contact goes through the officer form until they are."
        />
        {OFFICER_TIERS.map((tier) => {
          const group = officers.filter((o) => o.tier === tier);
          if (group.length === 0) return null;
          return (
            <div key={tier} className="mt-10">
              <h3 className="label border-b border-rule pb-2 text-ink-3">{tier}</h3>
              <ul className="grid grid-cols-1 border-l border-rule sm:grid-cols-2 lg:grid-cols-4">
                {group.map((o) => (
                  <OfficerCard key={`${o.name}-${o.position}`} officer={o} />
                ))}
              </ul>
            </div>
          );
        })}

        <div className="mt-10">
          <h3 className="label border-b border-rule pb-2 text-ink-3">Advisers</h3>
          <Todo>
            Adviser details are placeholders. Replace them in{" "}
            <code className="font-mono text-ink">data/officers.ts</code> once confirmed.
          </Todo>
          <ul className="border-t border-rule">
            {advisers.map((a) => (
              <li key={a.name} className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule py-4">
                <span className="display text-lg">{a.name}</span>
                <span className="label text-ink-3">{a.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- ANNOUNCEMENTS */}
      <section id="announcements" className="scroll-mt-24 py-10">
        <SectionHead
          index="02"
          title="Announcements"
          intro="Chapter news, deadline reminders and state updates."
          action={<ArrowLink href="/calendar">Calendar</ArrowLink>}
        />
        <Todo>
          All three posts below are examples. Replace them in{" "}
          <code className="font-mono text-ink">data/announcements.ts</code> and set{" "}
          <code className="font-mono text-ink">isTemplate: false</code>.
        </Todo>
        <div className="mt-4">
          {announcements.map((a) => (
            <AnnouncementCard key={a.slug} announcement={a} />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- PROJECTS */}
      <section className="py-10 pb-16">
        <SectionHead
          index="03"
          title="What we have built"
          intro="Every project the chapter documents goes into the archive, so next year's team starts from something."
          action={<ArrowLink href="/projects">Project archive</ArrowLink>}
        />
        <p className="mt-6 max-w-2xl text-ink-2">
          Competed in an event and want it written up?{" "}
          <Link href="/hub" className="link-underline">
            Send the officers a note
          </Link>{" "}
          and they will add it.
        </p>
      </section>
    </div>
  );
}
