import Link from "next/link";
import type { Project } from "@/lib/types";
import { PhotoPlaceholder } from "./Primitives";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="group border-b border-rule lg:border-r">
      <Link href={`/projects/${project.slug}`} className="block h-full p-5 transition-colors duration-150 hover:bg-paper-2">
        <PhotoPlaceholder caption={`${project.event} · ${project.year}`} ratio="16 / 10" />
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="label text-navy">{project.event}</span>
          <span aria-hidden className="text-rule-strong">·</span>
          <span className="label text-ink-3">{project.year}</span>
          {project.isTemplate && (
            <span className="label border border-signal px-1.5 py-0.5 text-signal">Template</span>
          )}
        </div>
        <h3 className="display mt-2 text-xl leading-tight">{project.title}</h3>
        <p className="mt-2 text-sm text-ink-2">
          {project.teamMembers.join(", ")} · {project.placement}
        </p>
        <span className="label mt-3 inline-flex items-center gap-2">
          Read the write-up
          <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </li>
  );
}
