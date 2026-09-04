import Link from "next/link";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Small shared pieces. Deliberately plain: hairline borders, square corners,
   uppercase mono labels. No cards-inside-cards, no shadows.
   --------------------------------------------------------------------------- */

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`label text-ink-3 ${className}`}>{children}</span>;
}

/** Numbered section heading — "03 / CALENDAR" with a rule under it. */
export function SectionHead({
  index,
  title,
  intro,
  action,
  id,
}: {
  index?: string;
  title: string;
  intro?: ReactNode;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="border-t border-ink pt-4 scroll-mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="display text-2xl sm:text-3xl">
          {index && <span className="label mr-3 align-middle text-ink-3">{index}</span>}
          {title}
        </h2>
        {action}
      </div>
      {intro && <p className="mt-3 max-w-2xl text-ink-2">{intro}</p>}
    </div>
  );
}

/** Marks content the officer team still has to supply. Intentionally loud. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <div className="todo my-4 text-sm">
      <span className="label mr-2 text-signal">Needs input</span>
      {children}
    </div>
  );
}

export function ArrowLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <span className="group inline-flex items-center gap-2">
      <span className="link-underline">{children}</span>
      <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">
        {external ? "↗" : "→"}
      </span>
    </span>
  );
  const cls = `label text-ink ${className}`;
  return external ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Every image on the site is a placeholder until real chapter photos land. */
export function PhotoPlaceholder({
  caption,
  ratio = "4 / 3",
  className = "",
}: {
  caption: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure className={`hatch relative border border-rule-strong ${className}`} style={{ aspectRatio: ratio }}>
      <figcaption className="absolute inset-x-0 bottom-0 border-t border-rule-strong bg-paper/90 px-3 py-2">
        <span className="label text-ink-2">Photo placeholder</span>
        <span className="block text-xs text-ink-2">{caption}</span>
      </figcaption>
    </figure>
  );
}

/** Key/value row used across event and project pages. */
export function DataRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-rule py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <dt className="label pt-0.5 text-ink-3">{term}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}

export function Tag({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "navy" | "signal" }) {
  const tones = {
    ink: "border-rule-strong text-ink-2",
    navy: "border-navy text-navy",
    signal: "border-signal text-signal",
  } as const;
  return <span className={`label border px-2 py-1 ${tones[tone]}`}>{children}</span>;
}
