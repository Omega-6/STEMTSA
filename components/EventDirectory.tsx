"use client";

import { useMemo, useState } from "react";
import EventCard from "./EventCard";
import type { CompetitionEvent, EventCategory } from "@/lib/types";
import { EVENT_CATEGORIES } from "@/data/events";

type CategoryFilter = "All" | EventCategory;
type FormatFilter = "Any" | "Individual" | "Team";

export default function EventDirectory({ events }: { events: CompetitionEvent[] }) {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [format, setFormat] = useState<FormatFilter>("Any");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      if (category !== "All" && e.category !== category) return false;
      if (format !== "Any" && !e.participation.includes(format)) return false;
      if (q && !`${e.name} ${e.summary} ${e.category}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [events, category, format, query]);

  const categories: CategoryFilter[] = ["All", ...EVENT_CATEGORIES];

  return (
    <>
      <div className="sticky top-[65px] z-30 -mx-4 border-y border-ink bg-paper/95 px-4 py-3 backdrop-blur-[2px] sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-2" role="group" aria-label="Filter by category">
            <span className="label mr-2 text-ink-3">Category</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`label border px-3 py-1.5 transition-colors duration-150 ${
                  category === c
                    ? "border-navy bg-navy text-white"
                    : "border-rule-strong text-ink-2 hover:border-ink hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1" role="group" aria-label="Filter by individual or team">
              <span className="label mr-1 text-ink-3">Format</span>
              {(["Any", "Individual", "Team"] as FormatFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  aria-pressed={format === f}
                  className={`label border px-3 py-1.5 transition-colors duration-150 ${
                    format === f
                      ? "border-ink bg-ink text-paper"
                      : "border-rule-strong text-ink-2 hover:border-ink hover:text-ink"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 border border-rule-strong px-3 py-1.5">
              <span className="sr-only">Filter events by name</span>
              <span aria-hidden className="text-ink-3">⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Filter by name…"
                className="w-40 bg-transparent text-sm outline-none placeholder:text-ink-3"
              />
            </label>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="label py-4 text-ink-3">
        Showing {filtered.length} of {events.length} events
        {category !== "All" && ` · ${category}`}
        {format !== "Any" && ` · ${format}`}
      </p>

      {filtered.length === 0 ? (
        <p className="border-y border-rule py-10 text-center text-ink-2">
          No events match those filters. Clear one and try again.
        </p>
      ) : (
        <ul className="grid grid-cols-1 border-t border-ink sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </ul>
      )}
    </>
  );
}
