"use client";

import { useRef, useState } from "react";
import {
  nationalAchievements,
  nationalResultsYear,
  stateAchievements,
  stateResultsYear,
} from "@/data/achievements";
import { ordinal } from "@/lib/format";

/* A manual carousel: scroll-snap track plus previous/next controls. It never
   moves on its own, which keeps it readable and keeps the page still. */

const TABS = [
  { key: "states", label: "PA-TSA States", data: stateAchievements, note: stateResultsYear },
  { key: "nationals", label: "Nationals", data: nationalAchievements, note: nationalResultsYear },
] as const;

export default function AchievementsCarousel() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("states");
  const trackRef = useRef<HTMLUListElement>(null);
  const current = TABS.find((t) => t.key === tab)!;

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * Math.max(260, track.clientWidth * 0.8), behavior: "smooth" });
  };

  const totalPlacements = current.data.reduce((n, a) => n + a.places.length, 0);
  const topThree = current.data.reduce((n, a) => n + a.places.filter((p) => p <= 3).length, 0);

  return (
    <section aria-labelledby="results-heading" className="border-b border-ink bg-paper-2">
      <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule py-4">
          <div>
            <h2 id="results-heading" className="label text-ink-3">
              Chapter results
            </h2>
            <p className="mt-1 text-sm text-ink-2">
              {topThree} top-three finish{topThree === 1 ? "" : "es"} across {totalPlacements} placements ·{" "}
              <span className="text-ink-3">{current.note}</span>
            </p>
          </div>

          <div className="flex items-stretch border border-rule-strong" role="tablist" aria-label="Competition level">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => {
                  setTab(t.key);
                  trackRef.current?.scrollTo({ left: 0 });
                }}
                className={`label px-4 py-2 transition-colors duration-150 ${
                  tab === t.key ? "bg-navy text-white" : "text-ink-2 hover:bg-paper"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <ul
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth py-5"
            aria-label={`${current.label} results`}
          >
            {current.data.map((a) => (
              <li
                key={a.event}
                className="w-[15rem] shrink-0 snap-start border-r border-rule px-5 first:pl-0 sm:w-[17rem]"
              >
                <div className="flex items-baseline gap-2">
                  {a.places.map((p) => (
                    <span
                      key={p}
                      className={`display text-3xl ${p <= 3 ? "text-navy" : "text-ink-3"}`}
                      aria-label={`${ordinal(p)} place`}
                    >
                      {p}
                      <span className="label align-super">{ordinal(p).slice(-2)}</span>
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm leading-snug">{a.event}</p>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-rule py-2">
            <p className="label text-ink-3">Scroll or use the arrows</p>
            <div className="flex gap-2">
              <button
                onClick={() => scrollBy(-1)}
                className="label border border-rule-strong px-3 py-1.5 text-ink-2 hover:border-ink hover:text-ink"
                aria-label="Previous results"
              >
                ←
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="label border border-rule-strong px-3 py-1.5 text-ink-2 hover:border-ink hover:text-ink"
                aria-label="Next results"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
