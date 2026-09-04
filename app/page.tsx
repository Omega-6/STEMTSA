import Link from "next/link";
import AchievementsCarousel from "@/components/AchievementsCarousel";
import HappeningTiles from "@/components/HappeningTiles";
import Timeline from "@/components/Timeline";
import AnnouncementCard from "@/components/AnnouncementCard";
import { ArrowLink, PhotoPlaceholder, SectionHead } from "@/components/Primitives";
import { announcements } from "@/data/announcements";
import { EVENT_CATEGORIES, events } from "@/data/events";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function HomePage() {
  const counts = EVENT_CATEGORIES.map((c) => ({
    category: c,
    n: events.filter((e) => e.category === c).length,
  }));

  return (
    <>
      {/* Results band sits above the masthead, like the strip across the top of
          a school paper. Compact on purpose — it should not outrank the hero. */}
      <AchievementsCarousel />

      {/* ---------------------------------------------------------------- HERO */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
          <div className="grid items-end gap-8 py-10 lg:grid-cols-12 lg:gap-12 lg:py-16">
            <div className="rise lg:col-span-6">
              <p className="label border-b border-rule pb-3 text-navy">{site.season}</p>
              <h1 className="display mt-6 text-[clamp(2.5rem,5.4vw,4.25rem)] uppercase">
                Downingtown
                <br />
                STEM TSA
              </h1>
              <p className="display mt-4 text-2xl text-navy sm:text-3xl">{site.tagline}</p>
              <p className="mt-5 max-w-md text-ink-2">
                The chapter&apos;s working headquarters: every event we can enter, what each one asks for, when it is
                due, and what the people before you built.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/compete" className="btn btn-primary">
                  Find your event <span aria-hidden>→</span>
                </Link>
                <Link href="/calendar?view=deadlines" className="btn">
                  See deadlines
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <PhotoPlaceholder
                ratio="3 / 2"
                caption="Replace with a real photo of the chapter — a build session, a team at states, the officer team. Drop the file in /public and swap PhotoPlaceholder for next/image."
              />
            </div>
          </div>

          {/* Technical strip. Small facts, no marketing claims. */}
          <dl className="grid grid-cols-2 border-t border-rule py-4 sm:grid-cols-4">
            {[
              { k: "School", v: site.school },
              { k: "Location", v: site.location },
              { k: "Events available", v: `${events.length}` },
              { k: "Affiliation", v: "PA-TSA · National TSA" },
            ].map((f) => (
              <div key={f.k} className="py-1 pr-4">
                <dt className="label text-ink-3">{f.k}</dt>
                <dd className="mt-1 text-sm">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
        {/* ------------------------------------------- 01 WHAT'S HAPPENING */}
        <section className="py-12 lg:py-16">
          <SectionHead
            index="01"
            title="What's happening?"
            intro="The four things a member most often needs to check. Officers keep these current."
            action={<ArrowLink href="/calendar">Full calendar</ArrowLink>}
          />
          <div className="mt-8">
            <HappeningTiles />
          </div>
        </section>

        {/* --------------------------------------------- 02 YEAR AT A GLANCE */}
        <section className="py-12 lg:py-16">
          <SectionHead
            index="02"
            title="TSA year at a glance"
            intro="A TSA season runs from recruitment in the autumn to nationals in June. Here is the shape of it."
          />
          <Timeline />
        </section>

        {/* ------------------------------------------------ 03 FIND YOUR EVENT */}
        <section className="py-12 lg:py-16">
          <SectionHead
            index="03"
            title="Which event is right for me?"
            intro="Start from the kind of work you want to do for a whole season, then narrow by format."
            action={<ArrowLink href="/compete">All {events.length} events</ArrowLink>}
          />
          <ul className="mt-8 grid grid-cols-1 border-t border-ink sm:grid-cols-2 lg:grid-cols-3">
            {counts.map((c, i) => (
              <li key={c.category} className="border-b border-rule sm:border-r">
                <Link
                  href="/compete"
                  className="group flex items-baseline justify-between gap-4 p-5 transition-colors duration-150 hover:bg-paper-2"
                >
                  <span>
                    <span className="label text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display mt-1 block text-xl">{c.category}</span>
                    <span className="mt-1 block text-sm text-ink-2">
                      {c.n} event{c.n === 1 ? "" : "s"}
                    </span>
                  </span>
                  <span aria-hidden className="text-ink-3 transition-transform duration-150 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------- 04 ANNOUNCEMENTS */}
        <section className="py-12 lg:py-16">
          <SectionHead
            index="04"
            title="From the officer team"
            action={<ArrowLink href="/chapter#announcements">All announcements</ArrowLink>}
          />
          <div className="mt-6 grid gap-x-10 lg:grid-cols-2">
            {announcements.slice(0, 2).map((a) => (
              <AnnouncementCard key={a.slug} announcement={a} />
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- 05 PROJECTS */}
        <section className="py-12 lg:py-16">
          <SectionHead
            index="05"
            title="What students here have built"
            intro="Not a trophy list. Each write-up covers the problem, the solution, the result and what the team would do differently."
            action={<ArrowLink href="/projects">Project archive</ArrowLink>}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {projects.slice(0, 2).map((p) => (
              <article key={p.slug} className="border border-rule p-5">
                <PhotoPlaceholder ratio="16 / 9" caption={`${p.event} · ${p.year}`} />
                <p className="label mt-4 text-navy">{p.event}</p>
                <h3 className="display mt-1 text-xl">{p.title}</h3>
                <ArrowLink href={`/projects/${p.slug}`} className="mt-3 inline-block">
                  Read the write-up
                </ArrowLink>
              </article>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- 06 HUB */}
        <section className="pb-16 pt-12 lg:pb-24 lg:pt-16">
          <div className="grid gap-8 border border-ink p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="label text-navy">TSA Hub</p>
              <h2 className="display mt-2 text-3xl sm:text-4xl">Stuck on something?</h2>
              <p className="mt-3 max-w-xl text-ink-2">
                The Hub answers the questions members actually ask — which event to pick, how teams work, where the
                rubrics live, when things are due. If the answer is not there, send it to the officers.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/hub" className="btn btn-primary">
                Open the Hub <span aria-hidden>→</span>
              </Link>
              <a href={site.askAQuestionForm} target="_blank" rel="noreferrer noopener" className="btn">
                Ask a question <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
