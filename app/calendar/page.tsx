import type { Metadata } from "next";
import CalendarView from "@/components/CalendarView";
import { calendar } from "@/data/calendar";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Chapter, PA-TSA and national dates, with a deadlines-only view for upcoming submissions.",
};

export default function CalendarPage() {
  const unconfirmed = calendar.filter((c) => c.unconfirmed).length;

  return (
    <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
      <header className="py-10 lg:py-14">
        <p className="label text-navy">Dates</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4rem)] uppercase">Calendar</h1>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-12">
          <p className="text-lg text-ink-2">
            Chapter meetings, competitions and every deadline in one place. Switch to{" "}
            <strong className="font-semibold text-ink">Deadlines only</strong> when you just need to know what is due.
          </p>
          {unconfirmed > 0 && (
            <aside className="border-l-2 border-signal pl-4 text-sm text-ink-2">
              <p className="label mb-1 text-signal">{unconfirmed} unconfirmed dates</p>
              <p>
                The calendar is seeded with placeholder entries so the views can be checked. Anything still marked
                “date not confirmed” has not been verified against PA-TSA or National TSA — do not plan around it.
              </p>
            </aside>
          )}
        </div>
      </header>

      <CalendarView entries={calendar} />

      <p className="pb-16 text-sm text-ink-2">
        Officers: entries live in <code className="font-mono text-ink">data/calendar.ts</code>. Each one supports a
        date, end date, time, description, category, related event, location and link. Drop the{" "}
        <code className="font-mono text-ink">unconfirmed</code> flag once a date is verified against the official
        source.
      </p>
    </div>
  );
}
