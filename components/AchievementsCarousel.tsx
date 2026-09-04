"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { nationalAchievements, stateAchievements } from "@/data/achievements";
import { ordinal } from "@/lib/format";

/* ---------------------------------------------------------------------------
   One combined results reel. State and national finishes run in a single track,
   each tile labelled with the level it came from, sorted best placement first so
   the reel opens on the wins.

   It advances on its own every few seconds and pauses when you hover it, focus
   inside it, scroll it by hand, or tab away from the tab. There is a real
   pause control, and it does not animate at all under prefers-reduced-motion.
   --------------------------------------------------------------------------- */

const INTERVAL_MS = 3200;

type Entry = { event: string; place: number; level: "States" | "Nationals" };

export default function AchievementsCarousel() {
  const entries = useMemo<Entry[]>(() => {
    const flat: Entry[] = [
      ...stateAchievements.flatMap((a) => a.places.map((place) => ({ event: a.event, place, level: "States" as const }))),
      ...nationalAchievements.flatMap((a) =>
        a.places.map((place) => ({ event: a.event, place, level: "Nationals" as const })),
      ),
    ];
    // Best finishes lead; nationals win ties because they are the harder room.
    return flat.sort(
      (a, b) => a.place - b.place || (a.level === b.level ? 0 : a.level === "Nationals" ? -1 : 1),
    );
  }, []);

  const trackRef = useRef<HTMLUListElement>(null);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const advance = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const step = track.firstElementChild?.clientWidth ?? 260;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    if (dir === 1 && atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!playing || paused || reduced) return;
    const id = window.setInterval(() => advance(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, paused, reduced, advance]);

  // Do not animate against someone who has switched to another tab.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const totals = useMemo(() => {
    const topThree = entries.filter((e) => e.place <= 3).length;
    const firsts = entries.filter((e) => e.place === 1).length;
    return { topThree, firsts, all: entries.length };
  }, [entries]);

  return (
    <section
      aria-labelledby="results-heading"
      className="border-b border-ink bg-paper-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule py-4">
          <h2 id="results-heading" className="label text-ink-3">
            Chapter results
          </h2>
          <p className="text-sm text-ink-2">
            <strong className="font-semibold text-signal">{totals.firsts} first-place finishes</strong>
            <span aria-hidden className="mx-2 text-rule-strong">·</span>
            {totals.topThree} in the top three
            <span aria-hidden className="mx-2 text-rule-strong">·</span>
            {totals.all} placements
            <span className="ml-2 text-ink-3">states and nationals combined</span>
          </p>
        </div>

        <div className="relative">
          <ul
            ref={trackRef}
            // Manual scrolling should feel like taking over, so pause while touched.
            onPointerDown={() => setPaused(true)}
            onPointerUp={() => setPaused(false)}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth py-5"
            aria-label="State and national results"
          >
            {entries.map((e, i) => (
              <li
                key={`${e.level}-${e.event}-${e.place}-${i}`}
                className="w-[14rem] shrink-0 snap-start border-r border-rule px-5 first:pl-0 sm:w-[16rem]"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={`display text-4xl ${e.place === 1 ? "text-signal" : e.place <= 3 ? "text-navy" : "text-ink-3"}`}
                    aria-label={`${ordinal(e.place)} place`}
                  >
                    {e.place}
                    <span className="label align-super">{ordinal(e.place).slice(-2)}</span>
                  </span>
                  <span
                    className={`label border px-1.5 py-0.5 ${
                      e.level === "Nationals" ? "border-navy text-navy" : "border-rule-strong text-ink-3"
                    }`}
                  >
                    {e.level}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-snug">{e.event}</p>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-4 border-t border-rule py-2">
            <p className="label text-ink-3">
              {reduced ? "Scroll to browse" : playing && !paused ? "Auto-advancing" : "Paused"}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => advance(-1)}
                className="label border border-rule-strong px-3 py-1.5 text-ink-2 hover:border-ink hover:text-ink"
                aria-label="Previous result"
              >
                ←
              </button>
              {!reduced && (
                <button
                  onClick={() => setPlaying((v) => !v)}
                  aria-pressed={!playing}
                  className="label border border-rule-strong px-3 py-1.5 text-ink-2 hover:border-ink hover:text-ink"
                >
                  {playing ? "Pause" : "Play"}
                </button>
              )}
              <button
                onClick={() => advance(1)}
                className="label border border-rule-strong px-3 py-1.5 text-ink-2 hover:border-ink hover:text-ink"
                aria-label="Next result"
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
