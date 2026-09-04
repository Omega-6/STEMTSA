import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink, PhotoPlaceholder, SectionHead } from "@/components/Primitives";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: `${project.event} · ${project.year}` };
}

function Prose({ heading, index, body, hint }: { heading: string; index: string; body: string | null; hint: string }) {
  return (
    <section className="py-8">
      <SectionHead index={index} title={heading} />
      {body ? (
        <p className="mt-4 max-w-3xl text-ink-2">{body}</p>
      ) : (
        <div className="todo mt-4 max-w-3xl text-sm">
          <span className="label mr-2 text-signal">Needs input</span>
          {hint}
        </div>
      )}
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
      <header className="border-b border-ink py-8 lg:py-12">
        <Link href="/projects" className="label text-ink-3 hover:text-ink">
          ← Project archive
        </Link>
        {project.isTemplate && (
          <p className="label mt-4 inline-block border border-signal px-2 py-1 text-signal">
            Template entry — not a real project
          </p>
        )}
        <h1 className="display mt-4 text-[clamp(2.25rem,6vw,4rem)]">{project.title}</h1>
        <dl className="mt-6 grid grid-cols-2 gap-y-4 border-t border-rule pt-4 sm:grid-cols-4">
          {[
            { k: "Year", v: project.year },
            { k: "Event", v: project.event },
            { k: "Team", v: project.teamMembers.join(", ") },
            { k: "Placement", v: project.placement },
          ].map((f) => (
            <div key={f.k} className="pr-4">
              <dt className="label text-ink-3">{f.k}</dt>
              <dd className="mt-1 text-sm">
                {f.k === "Event" && project.eventSlug ? (
                  <Link href={`/compete/${project.eventSlug}`} className="link-underline">
                    {f.v}
                  </Link>
                ) : (
                  f.v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div>
          <Prose
            index="01"
            heading="The problem"
            body={project.problem}
            hint="What problem did the team pick, and why did it matter? Two or three sentences, in the team's own words."
          />
          <Prose
            index="02"
            heading="Our solution"
            body={project.solution}
            hint="What did they design or build in response? Be concrete — components, stack, materials, approach."
          />
          <Prose
            index="03"
            heading="What we built"
            body={project.whatWeBuilt}
            hint="Describe the finished artefact and link the documentation. Photos go in the column beside this."
          />
          <Prose
            index="04"
            heading="Results"
            body={project.results}
            hint="Where it placed, and what the judges responded to."
          />
          <Prose
            index="05"
            heading="What we learned"
            body={project.whatWeLearned}
            hint="The most useful section for the next team. What would they do differently with the same season again?"
          />
        </div>

        <aside className="pb-16 lg:py-8">
          <p className="label border-b border-rule pb-2 text-ink-3">Gallery</p>
          <div className="mt-4 space-y-5">
            {project.images.map((img) => (
              <PhotoPlaceholder key={img.caption} caption={img.caption} ratio="4 / 3" />
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-3">
            Put real files in <code className="font-mono">/public/projects/</code> and set{" "}
            <code className="font-mono">images[].src</code> in{" "}
            <code className="font-mono">data/projects.ts</code>.
          </p>
          {project.eventSlug && (
            <div className="mt-8 border-t border-rule pt-4">
              <ArrowLink href={`/compete/${project.eventSlug}`}>Event page for {project.event}</ArrowLink>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
