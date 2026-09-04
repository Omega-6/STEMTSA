import Link from "next/link";
import { whatsHappening } from "@/data/whats-happening";

/* Four compact tiles. Deliberately not four rounded cards: one bordered grid,
   hairline dividers, the label doing the work. */

export default function HappeningTiles() {
  return (
    <div className="grid grid-cols-1 border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
      {whatsHappening.map((tile) => {
        const body = (
          <>
            <div className="flex items-start justify-between gap-3">
              <span className="label text-navy">{tile.kind}</span>
              {tile.href && (
                <span aria-hidden className="text-ink-3 transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              )}
            </div>
            {tile.headline ? (
              <>
                <p className="display mt-3 text-xl leading-tight">{tile.headline}</p>
                {tile.date && <p className="label mt-2 text-ink-2">{tile.date}</p>}
                {tile.detail && <p className="mt-2 text-sm text-ink-2">{tile.detail}</p>}
              </>
            ) : (
              <>
                <p className="display mt-3 text-xl leading-tight text-ink-3">Not set yet</p>
                <p className="mt-2 border-l-2 border-signal pl-3 text-sm text-ink-2">{tile.detail}</p>
              </>
            )}
          </>
        );

        return tile.href ? (
          <Link
            key={tile.kind}
            href={tile.href}
            className="group border-b border-rule px-0 py-5 transition-colors duration-150 hover:bg-paper-2 sm:border-r sm:px-5 sm:first:pl-0"
          >
            {body}
          </Link>
        ) : (
          <div key={tile.kind} className="border-b border-rule py-5 sm:border-r sm:px-5">
            {body}
          </div>
        );
      })}
    </div>
  );
}
