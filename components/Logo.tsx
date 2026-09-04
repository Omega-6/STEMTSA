import { site } from "@/data/site";
import { asset } from "@/lib/asset";

/* ---------------------------------------------------------------------------
   Logo slots.
   Drop the real files into /public/logos/ and set the paths in data/site.ts.
   Until then each slot renders a monogram that is deliberately designed, not a
   broken image, so the site looks finished either way.
   --------------------------------------------------------------------------- */

type Which = "school" | "tsa";

const FALLBACK: Record<Which, { mark: string; label: string }> = {
  school: { mark: "DS", label: "Downingtown STEM Academy" },
  tsa: { mark: "TSA", label: "Technology Student Association" },
};

export default function Logo({
  which,
  size = 36,
  className = "",
}: {
  which: Which;
  size?: number;
  className?: string;
}) {
  const src = site.logos[which];
  const fallback = FALLBACK[which];

  if (src) {
    return (
      // Plain img: the site is a static export with image optimisation off, so
      // next/image would add machinery for no benefit here.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset(src)}
        alt={fallback.label}
        height={size}
        style={{ height: size, width: "auto" }}
        className={`shrink-0 object-contain ${className}`}
      />
    );
  }

  return (
    <span
      aria-label={fallback.label}
      role="img"
      style={{ height: size, minWidth: size }}
      className={`grid shrink-0 place-items-center border border-ink px-1.5 font-mono text-[0.6em] font-medium tracking-tight ${
        which === "school" ? "bg-navy text-white" : "bg-paper text-navy"
      } ${className}`}
    >
      {fallback.mark}
    </span>
  );
}
