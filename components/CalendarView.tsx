"use client";

import { useEffect, useMemo, useState } from "react";
import type { CalendarCategory, CalendarEntry } from "@/lib/types";
import { CALENDAR_CATEGORIES } from "@/data/calendar";
import { daysInMonth, firstWeekday, formatDate, formatRange, isoOf, monthName, parseISO, weekdayLabels } from "@/lib/format";

type View = "calendar" | "list" | "deadlines";

/* Category is signalled by a left rule and a mono label, not by a colour
   swatch soup. Deadlines are the only category that gets the accent colour,
   because those are the ones that cost students points. */
const CATEGORY_STYLE: Record<CalendarCategory, { rule: string; text: string }> = {
  Chapter: { rule: "border-l-ink", text: "text-ink-2" },
  "PA-TSA": { rule: "border-l-navy", text: "text-navy" },
  "National TSA": { rule: "border-l-navy-2", text: "text-navy-2" },
  Competition: { rule: "border-l-ink", text: "text-ink" },
  Deadline: { rule: "border-l-signal", text: "text-signal" },
};

function EntryRow({ entry }: { entry: CalendarEntry }) {
  const style = CATEGORY_STYLE[entry.category];
  return (
    <li className={`border-b border-rule border-l-2 ${style.rule} py-4 pl-4`}>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="label w-44 shrink-0 text-ink-2">
          {formatRange(entry.date, entry.endDate)}
          {entry.time && ` · ${entry.time}`}
        </span>
        <span className={`label ${style.text}`}>{entry.category}</span>
        {entry.unconfirmed && (
          <span className="label border border-signal px-1.5 py-0.5 text-signal">Date not confirmed</span>
        )}
      </div>
      <p className="display mt-1.5 text-lg leading-tight">{entry.title}</p>
      {entry.description && <p className="mt-1 max-w-2xl text-sm text-ink-2">{entry.description}</p>}
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-2">
        {entry.location && (
          <span>
            <span className="label mr-2 text-ink-3">Where</span>
            {entry.location}
          </span>
        )}
        {entry.link && (
          <a href={entry.link} target="_blank" rel="noreferrer noopener" className="link-underline">
            Official source <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </li>
  );
}

export default function CalendarView({ entries }: { entries: CalendarEntry[] }) {
  const sorted = useMemo(() => [...entries].sort((a, b) => a.date.localeCompare(b.date)), [entries]);
  const start = parseISO(sorted[0]?.date ?? "2026-09-01");

  const [view, setView] = useState<View>("calendar");
  const [cursor, setCursor] = useState({ y: start.y, m: start.m });
  const [active, setActive] = useState<Set<CalendarCategory>>(new Set(CALENDAR_CATEGORIES));
  const [todayISO, setTodayISO] = useState<string | null>(null);

  // Read ?view= and resolve "today" after mount so SSR and client markup match.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("view");
    if (v === "deadlines" || v === "list" || v === "calendar") setView(v);
    const now = new Date();
    setTodayISO(isoOf(now.getFullYear(), now.getMonth() + 1, now.getDate()));
  }, []);

  const toggle = (c: CalendarCategory) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const visible = sorted.filter((e) => active.has(e.category));
  const deadlines = sorted.filter((e) => e.category === "Deadline");

  const byDay = useMemo(() => {
    const map = new Map<string, CalendarEntry[]>();
    for (const e of visible) {
      const from = parseISO(e.date);
      const to = e.endDate ? parseISO(e.endDate) : from;
      // Expand multi-day entries so they appear on every day they cover.
      for (let d = new Date(Date.UTC(from.y, from.m - 1, from.d)); ; d.setUTCDate(d.getUTCDate() + 1)) {
        const iso = d.toISOString().slice(0, 10);
        map.set(iso, [...(map.get(iso) ?? []), e]);
        if (iso >= isoOf(to.y, to.m, to.d)) break;
      }
    }
    return map;
  }, [visible]);

  const total = daysInMonth(cursor.y, cursor.m);
  const lead = firstWeekday(cursor.y, cursor.m);
  const cells = [...Array(lead).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];

  const step = (dir: 1 | -1) =>
    setCursor(({ y, m }) => {
      const next = m + dir;
      if (next < 1) return { y: y - 1, m: 12 };
      if (next > 12) return { y: y + 1, m: 1 };
      return { y, m: next };
    });

  return (
    <>
      <div className="flex flex-col gap-4 border-y border-ink py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-stretch border border-rule-strong" role="tablist" aria-label="Calendar view">
          {([
            ["calendar", "Calendar"],
            ["list", "List"],
            ["deadlines", "Deadlines only"],
          ] as [View, string][]).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={view === key}
              onClick={() => setView(key)}
              className={`label px-4 py-2 transition-colors duration-150 ${
                view === key ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper-2"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {view !== "deadlines" && (
          <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Filter by category">
            <span className="label mr-2 text-ink-3">Show</span>
            {CALENDAR_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => toggle(c)}
                aria-pressed={active.has(c)}
                className={`label border px-3 py-1.5 transition-colors duration-150 ${
                  active.has(c)
                    ? `border-ink ${CATEGORY_STYLE[c].text}`
                    : "border-rule text-ink-3 line-through"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {view === "calendar" && (
        <section aria-label="Month view" className="py-6">
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <h2 className="display text-2xl">
              {monthName(cursor.m)} <span className="text-ink-3">{cursor.y}</span>
            </h2>
            <div className="flex gap-2">
              <button onClick={() => step(-1)} className="label border border-rule-strong px-3 py-1.5 hover:border-ink" aria-label="Previous month">←</button>
              <button onClick={() => setCursor({ y: start.y, m: start.m })} className="label border border-rule-strong px-3 py-1.5 hover:border-ink">
                Season start
              </button>
              <button onClick={() => step(1)} className="label border border-rule-strong px-3 py-1.5 hover:border-ink" aria-label="Next month">→</button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 border-l border-t border-rule">
            {weekdayLabels.map((d) => (
              <div key={d} className="border-b border-r border-rule bg-paper-2 px-2 py-2">
                <span className="label text-ink-3">{d}</span>
              </div>
            ))}
            {cells.map((day, i) => {
              const iso = day ? isoOf(cursor.y, cursor.m, day) : null;
              const dayEntries = iso ? byDay.get(iso) ?? [] : [];
              const isToday = iso !== null && iso === todayISO;
              return (
                <div
                  key={i}
                  className={`min-h-[6rem] border-b border-r border-rule p-2 align-top ${day ? "" : "bg-paper-2/50"} ${
                    isToday ? "bg-paper-2" : ""
                  }`}
                >
                  {day && (
                    <>
                      <span className={`label ${isToday ? "text-navy" : "text-ink-3"}`}>
                        {day}
                        {isToday && <span className="ml-1">· today</span>}
                      </span>
                      <ul className="mt-1.5 space-y-1">
                        {dayEntries.map((e) => (
                          <li
                            key={e.id + iso}
                            className={`border-l-2 ${CATEGORY_STYLE[e.category].rule} pl-1.5 text-xs leading-snug`}
                          >
                            {e.title}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-ink-3">
            Multi-day entries are drawn on every day they cover. On a phone, the List view is easier to read.
          </p>
        </section>
      )}

      {view === "list" && (
        <section aria-label="List view" className="py-6">
          {visible.length === 0 ? (
            <p className="py-10 text-center text-ink-2">No entries in the selected categories.</p>
          ) : (
            <ul className="border-t border-rule">
              {visible.map((e) => (
                <EntryRow key={e.id} entry={e} />
              ))}
            </ul>
          )}
        </section>
      )}

      {view === "deadlines" && (
        <section aria-label="Deadlines only" className="py-6">
          <p className="max-w-2xl text-ink-2">
            Every date on this list is something that has to be handed in or signed up for. Chapter checkpoints sit
            earlier than official deadlines on purpose.
          </p>
          {deadlines.length === 0 ? (
            <p className="py-10 text-center text-ink-2">No deadlines recorded yet.</p>
          ) : (
            <ol className="mt-6 border-t border-ink">
              {deadlines.map((e, i) => (
                <li key={e.id} className="grid grid-cols-1 gap-2 border-b border-rule py-5 sm:grid-cols-[4rem_10rem_1fr]">
                  <span className="label pt-1 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-lg text-signal">{formatDate(e.date, "short")}</span>
                  <span>
                    <span className="display block text-lg leading-tight">{e.title}</span>
                    {e.description && <span className="mt-1 block text-sm text-ink-2">{e.description}</span>}
                    {e.unconfirmed && (
                      <span className="label mt-2 inline-block border border-signal px-1.5 py-0.5 text-signal">
                        Date not confirmed
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}
    </>
  );
}
