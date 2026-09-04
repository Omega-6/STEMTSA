import type { Metadata } from "next";
import EventDirectory from "@/components/EventDirectory";
import { ArrowLink } from "@/components/Primitives";
import { events } from "@/data/events";
import { officialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Compete",
  description: "Every TSA event this chapter can enter, filterable by category and by individual or team.",
};

export default function CompetePage() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
      <header className="py-10 lg:py-14">
        <p className="label text-navy">Event directory</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4rem)] uppercase">Compete</h1>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-12">
          <p className="text-lg text-ink-2">
            {events.length} events, sorted alphabetically. Filter down to the ones that match how you actually want to
            spend a season, then open an event to see what it asks for.
          </p>
          <aside className="border-l-2 border-signal pl-4 text-sm text-ink-2">
            <p className="label mb-1 text-signal">Read this first</p>
            <p>
              Category, individual/team and chapter status below are maintained by our officers as a starting point.
              They are not official data. Team sizes, rules and rubrics come from the current TSA event guide, which is
              linked on every event page.
            </p>
            <ArrowLink href={officialLinks.competitions.href} external className="mt-3 inline-block">
              Official event guides
            </ArrowLink>
          </aside>
        </div>
      </header>

      <EventDirectory events={events} />

      <div className="py-12" />
    </div>
  );
}
