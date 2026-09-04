import { timeline } from "@/data/timeline";

/* Horizontal on desktop, vertical on mobile. Reads as a schedule, not a
   decoration: every phase shows either a real date range or an explicit
   "dates TBD" so nothing looks confirmed when it is not. */

export default function Timeline() {
  return (
    <div className="mt-8">
      <ol className="grid grid-cols-1 border-t border-ink sm:grid-cols-2 lg:grid-cols-5">
        {timeline.map((phase, i) => (
          <li
            key={phase.month}
            className={`border-b border-rule px-0 py-5 sm:border-r sm:px-5 sm:first:pl-0 lg:py-6 ${
              phase.emphasis ? "bg-paper-2" : ""
            }`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className={`display text-2xl uppercase ${phase.emphasis ? "text-navy" : ""}`}>
                {phase.month}
              </span>
              <span className="label text-ink-3">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <p className="label mt-2 text-ink-3">{phase.dateRange ?? "Dates TBD"}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {phase.items.map((item) => (
                <li key={item} className={phase.emphasis ? "font-medium text-navy" : "text-ink-2"}>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-ink-3">
        Shape of a normal TSA season. These are not confirmed Downingtown STEM dates — real ones go in
        <code className="mx-1 font-mono text-ink-2">data/timeline.ts</code> and replace the “Dates TBD” label.
      </p>
    </div>
  );
}
