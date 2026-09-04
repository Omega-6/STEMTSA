import type { Officer } from "@/lib/types";
import { site } from "@/data/site";

export default function OfficerCard({ officer }: { officer: Officer }) {
  return (
    <li className="group border-b border-rule p-5 transition-colors duration-150 hover:bg-paper-2 sm:border-r">
      {/* Portrait slot. Stays a marked placeholder until officers supply photos. */}
      <div className="hatch mb-4 grid aspect-[4/5] place-items-center border border-rule-strong">
        <span className="label text-ink-3">Photo</span>
      </div>
      <p className="label text-navy">{officer.position}</p>
      <p className="display mt-1 text-lg leading-tight">{officer.name}</p>
      {officer.responsibilities && <p className="mt-2 text-sm text-ink-2">{officer.responsibilities}</p>}
      <a
        href={officer.email ? `mailto:${officer.email}` : site.askAQuestionForm}
        target={officer.email ? undefined : "_blank"}
        rel={officer.email ? undefined : "noreferrer noopener"}
        className="label mt-3 inline-flex items-center gap-2 text-ink"
      >
        <span className="link-underline">{officer.email ? "Email" : "Contact"}</span>
        <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">→</span>
      </a>
    </li>
  );
}
