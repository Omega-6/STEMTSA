import Link from "next/link";
import type { CompetitionEvent } from "@/lib/types";

export default function EventCard({ event }: { event: CompetitionEvent }) {
  return (
    <li className="group border-b border-rule lg:border-r">
      <Link
        href={`/compete/${event.slug}`}
        className="flex h-full flex-col justify-between gap-6 p-5 transition-colors duration-150 hover:bg-paper-2 focus-visible:bg-paper-2"
      >
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="label text-navy">{event.category}</span>
            <span aria-hidden className="text-rule-strong">·</span>
            <span className="label text-ink-3">{event.participation}</span>
            {event.level === "PA only" && (
              <span className="label border border-signal px-1.5 py-0.5 text-signal">PA only</span>
            )}
          </div>

          <h3 className="display mt-3 text-xl leading-tight">{event.name}</h3>
          <p className="mt-2 text-sm text-ink-2">{event.summary}</p>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-rule pt-3">
          <span className="label text-ink-3">
            Status
            <span className={`ml-2 ${event.status === "Status TBD" ? "text-signal" : "text-ink"}`}>
              {event.status === "Status TBD" ? "Not set" : event.status}
            </span>
          </span>
          <span className="label inline-flex items-center gap-2 text-ink">
            View event
            <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}
