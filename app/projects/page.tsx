"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projectEvents, projectPlacements, projects, projectYears } from "@/data/projects";

/* Client component so the year / event / placement filters work without a
   round trip. The data itself is static. */

export default function ProjectsPage() {
  const [year, setYear] = useState("All");
  const [event, setEvent] = useState("All");
  const [placement, setPlacement] = useState("All");

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (year === "All" || p.year === year) &&
          (event === "All" || p.event === event) &&
          (placement === "All" || p.placement === placement),
      ),
    [year, event, placement],
  );

  const filters: { label: string; value: string; set: (v: string) => void; options: string[] }[] = [
    { label: "Year", value: year, set: setYear, options: projectYears },
    { label: "Event", value: event, set: setEvent, options: projectEvents },
    { label: "Placement", value: placement, set: setPlacement, options: projectPlacements },
  ];

  return (
    <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
      <header className="py-10 lg:py-14">
        <p className="label text-navy">Archive</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4rem)] uppercase">Past projects</h1>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-12">
          <p className="text-lg text-ink-2">
            Not a trophy case. Each write-up covers the problem the team picked, what they actually built, how it did,
            and what they would change. Read the one closest to your event before you start.
          </p>
          <aside className="border-l-2 border-signal pl-4 text-sm text-ink-2">
            <p className="label mb-1 text-signal">Archive is empty</p>
            <p>
              The entries below are templates showing the write-up format. Replace them in{" "}
              <code className="font-mono text-ink">data/projects.ts</code> with real projects and photos.
            </p>
          </aside>
        </div>
      </header>

      <div className="flex flex-wrap items-end gap-x-8 gap-y-4 border-y border-ink py-4">
        {filters.map((f) => (
          <label key={f.label} className="flex flex-col gap-1.5">
            <span className="label text-ink-3">{f.label}</span>
            <select
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              className="border border-rule-strong bg-paper px-3 py-2 text-sm hover:border-ink"
            >
              <option value="All">All</option>
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        ))}
        <p aria-live="polite" className="label pb-2 text-ink-3">
          {filtered.length} of {projects.length} projects
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="border-b border-rule py-16 text-center text-ink-2">
          Nothing matches those filters.
        </p>
      ) : (
        <ul className="grid grid-cols-1 border-t border-ink sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </ul>
      )}

      <div className="py-16" />
    </div>
  );
}
